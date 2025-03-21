import { Request, Response, NextFunction } from "express";
import { Model, Document, FilterQuery, PopulateOptions } from "mongoose";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import APIFeatures from "../utils/apiFeatures";
import redis from "../utils/redis";
// import redis from "../utils/redis";

// Generic function to create a document
export const createOne = <T extends Document>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let body = { ...req.body };

    if (req.user) {
      body = {
        ...req.body,
        user: req.user,
      };
    }

    const doc = await Model.create(body);

    res.status(201).json({
      status: "success",
      message: "Document created successfully!",
      data: {
        doc,
      },
    });
  });

// Generic function to get one document by ID or slug
export const getOne = <T extends Document>(
  Model: Model<T>,
  populateOpts?: string | PopulateOptions | (string | PopulateOptions)[] | null,
  isSlug: boolean = false
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query;

    if (isSlug) {
      query = Model.findOne({ slug: req.params.slug } as FilterQuery<T>);
    } else {
      const id = req.params.id?.toString(); // Ensure `id` is a string
      if (!id) return next(new AppError("Invalid ID format!", 400));
      query = Model.findById(id);
    }

    if (populateOpts) {
      query = query.populate(populateOpts);
    }

    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID!", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

// Generic function to delete one document by ID
export const deleteOne = <T extends Document>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID!", 404));
    }
    const isRoomModel = Model.modelName === "Room";
    if (isRoomModel) {
      const roomCacheKey = `rooms:${req.params.id}`;
      await redis.del(roomCacheKey);
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

// Generic function to update one document by ID
export const updateOne = <T extends Document>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    const isRoomModel = Model.modelName === "Room";
    if (isRoomModel) await redis.del(`rooms:${JSON.stringify(req.query)}`);
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

export const getAll = <T extends Document>(
  Model: Model<T>,
  payload: string | null = null
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let filter: Record<string, any> = {};
    let data;
    const isRoomModel = Model.modelName === "Room";
    const cacheKey = isRoomModel ? `rooms:${JSON.stringify(req.query)}` : null;

    if (payload) {
      payload = req.body.payload?.trim();
    }
    if (req.params.roomId) {
      filter = { room: req.params.roomId };
    }

    if (isRoomModel && cacheKey) {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        const data = JSON.parse(cachedData);
        return res.status(200).json({
          status: "success",
          results: data.length,
          data,
          fromCache: true,
        });
      }
    }

    const query = Model.find(filter); // Include filter here
    if (req.query.sort) query.sort(req.query.sort);
    if (req.query.limit) query.limit(Number(req.query.limit));
    if (req.query.page)
      query.skip((Number(req.query.page) - 1) * Number(req.query.limit));

    try {
      data = await query;
    } catch (err) {
      console.log("Database Query Error:", err);
      return next(err);
    }

    // Log fetched data
    console.log("Fetched Data:", data);

    if (isRoomModel && cacheKey) {
      await redis.setEx(cacheKey, 3600, JSON.stringify(data)); // Expire in 1 hour
    }

    res.status(200).json({
      status: "success",
      results: data.length,
      data,
    });
  });
