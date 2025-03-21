import { Book, BookDocument } from "../models/bookingModule";
import AppError from "../utils/appError";
import { Room } from "../models/roomModule";
import catchAsync from "../utils/catchAsync";
import { createOne, deleteOne } from "./handlerFactory";
import { ObjectId } from "mongoose";
import { RequestHandler } from "express";
export const setRoomData: RequestHandler<{ roomId: string }> = catchAsync(
  async (req, res, next) => {
    if (!req.body.room) req.body.room = req.params.roomId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
  }
);
export const createBook = createOne(Book);
export const deleteBook = deleteOne(Book);
export const getBooks: RequestHandler = catchAsync(async (req, res, next) => {
  const allBooks = await Book.find({ user: req.user.id });
  if (!allBooks)
    return next(new AppError("There is no bookings with this user!", 404));

  const roomIDs = allBooks.map(
    (el: BookDocument & { room: ObjectId }) => el.room
  );
  const books = await Room.find({ _id: { $in: roomIDs } });
  res.status(200).json({
    status: "success",
    results: allBooks.length,
    data: {
      docs: allBooks,
    },
  });
});
