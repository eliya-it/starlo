import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory";
import { Room } from "../models/roomModule";

import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import multer from "multer";
import sharp from "sharp";

const multerStorage = multer.memoryStorage();
const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: any, acceptFile: boolean) => void
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true); // Accept the file
  } else {
    // Pass a generic Error instead of an AppError
    cb(new Error("Not an image. Please upload only images!"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadRoomPhotos = upload.fields([
  {
    name: "cover",
    maxCount: 1,
  },
  {
    name: "photos",
    maxCount: 3,
  },
]);

export const resizeRoomPhotos: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Handle cover and photos name to DB
    if (!req.files)
      return next(new AppError("You must upload room photos!", 400));

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    console.log(files);

    req.body.cover = `room-${Math.ceil(
      Math.random()
    )}-${Date.now()}-cover.jpeg`;
    await sharp(files.cover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/rooms/${req.body.cover}`);

    // Process multiple photos
    req.body.photos = [];
    // Move to the next middleware when all photos are done
    await Promise.all(
      files["photos"].map(async (photo, i) => {
        const photoName = `room-${Date.now()}-${i + 1}.jpeg`;
        await sharp(photo.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/img/rooms/${photoName}`);
        req.body.photos.push(photoName);
      })
    );

    next();
  }
);

export const getAllRooms = getAll(Room);

export const createRoom = createOne(Room);
export const getRoom = getOne(Room, null, true);
export const updateRoom = updateOne(Room);
export const deleteRoom = deleteOne(Room);

export const roomStatistics: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await Room.aggregate([
        {
          $match: { ratingsAverage: { $gte: 4.5 } },
        },
        {
          $group: {
            _id: "$bedsCount",
            roomsNumber: { $sum: 1 },
            roomsRatingsQuantity: { $avg: "$ratingsQuantity" },
            roomRatingsAverage: { $avg: "$ratingsAverage" },
          },
        },
        {
          // Sort by quantity
          $sort: { roomsRatingsQuantity: 1 },
        },
      ]);
      res.status(200).json({
        status: "success",
        length: stats.length,
        data: {
          stats,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  }
);
