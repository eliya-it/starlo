import catchAsync from "../utils/catchAsync";
import { deleteOne, getOne } from "./handlerFactory";
import { User } from "../models/userModule";
import AppError from "../utils/appError";
import multer, { FileFilterCallback } from "multer";
import sharp from "sharp";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import { Request, RequestHandler } from "express";
import redis from "../utils/redis";
import { ObjectId } from "mongoose";
const multerStorage = multer.memoryStorage();
const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true); // Accept the file
  } else {
    cb(null, false); // Reject the file
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
export const uploadUserphoto = upload.single("photo");
export const resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});
const filterObject = (obj: any, ...allowedFields: string[]) => {
  const newObj: { [key: string]: any } = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
export const getMe: RequestHandler = catchAsync(async (req, res, next) => {
  console.log(req.user.id);

  if (req.user.id) {
    req.params.id = req.user.id.toString();
  }

  next();
});

export const getUser = getOne(User);
export const updateMe = catchAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password || confirmPassword) {
    return next(
      new AppError(
        "This route is not for password updates! Please use /updateMypassword .",
        400
      )
    );
  }
  const filteredBody = filterObject(req.body, "name", "email", "photo");
  if (req.file) filteredBody.photo = req.file.filename;
  console.log("user id from request", req.user.id);

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  await redis.del(`session:${req.user.id}`);
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
export const setUserId: RequestHandler = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id.toString();
  next();
});

export const deleteMe = deleteOne(User);
