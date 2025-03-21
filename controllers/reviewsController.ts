import { Request, Response, NextFunction, RequestHandler } from "express";
import { Review, ReviewDocument } from "../models/reviewsModule";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { deleteOne, getAll, getOne, updateOne } from "./handlerFactory";
import { FilterQuery, Schema, Types } from "mongoose";
import redis from "../utils/redis";

export const createReview: RequestHandler = catchAsync(
  async (req, res, next) => {
    const body = {
      ...req.body,
      user: req.user,
      room: req.params.id,
    };
    console.log("Params ---", req.params);

    const review = await Review.create(body);
    res.status(201).json({
      status: "success",
      message: "Review Created Successfully",
      data: {
        review,
      },
    });
  }
);
const validateObjectId = (id: string): Types.ObjectId => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid ObjectId format", 400);
  }
  return new Types.ObjectId(id);
};

export const getRoomReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id || !Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid or missing room ID!", 400));
    }
    const roomId = validateObjectId(req.params.id);
    const roomFilter: FilterQuery<ReviewDocument> = { room: roomId };
    const reviews = await Review.find(roomFilter);

    if (!reviews || reviews.length === 0) {
      return next(new AppError("There are no reviews with this room ID!", 400));
    }

    res.status(200).json({
      status: "success",
      results: reviews.length,
      data: reviews,
    });
  }
);

export const getReviews = getAll(Review);
export const getReview = getOne(Review);
export const deleteReview: RequestHandler = catchAsync(
  async (req, res, next) => {
    const doc = await Review.findById(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID!", 404));
    }
    if (doc.user.toString() !== req.user.id.toString()) {
      return next(
        new AppError("You are not authorized to delete this document.", 403)
      );
    }
    await doc.remove();
    const roomCacheKey = `rooms:${req.params.id}`;
    await redis.del(roomCacheKey);
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
export const updateReview = updateOne(Review);
