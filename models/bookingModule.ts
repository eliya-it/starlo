import mongoose, { Document, Model, model, ObjectId, Schema } from "mongoose";

export interface BookDocument extends Document<ObjectId> {
  room: ObjectId;
  user: ObjectId;
  createdAt: Date;
  paid: boolean;
}

const bookingSchema: Schema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    required: [true, "Booking must belong to a room must "],
    ref: "Room",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to user"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  paid: {
    type: Boolean,
    default: true,
  },
});
bookingSchema.index(
  { room: 1, user: 1 },
  {
    unique: true,
  }
);
bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: ["_id", "name", "photo"],
  }).populate({
    path: "room",
    select: ["name", "price", "cover"],
  });
  next();
});
const Book: Model<BookDocument> = model<BookDocument>("Booking", bookingSchema);
export { Book };
