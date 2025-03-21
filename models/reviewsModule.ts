import { model, Schema, Document, Model, Types } from "mongoose";
import { Room } from "./roomModule";
type ObjectId = Types.ObjectId | Schema.Types.ObjectId;
// Define the interface for the Review document (instance)
export interface ReviewDocument extends Document {
  review: string;
  rating: number;
  room: ObjectId;
  user: ObjectId;
  createdAt: Date;
  newReview?: any;
}

// Extend the Mongoose model interface with the static method calcAvgRatings
interface ReviewModel extends Model<ReviewDocument> {
  calcAvgRatings(room: ObjectId): Promise<void>;
}

const reviewSchema: Schema = new Schema(
  {
    review: {
      type: String,
      required: [true, "A review cannot be empty"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: [true, "Review must belong to a room!"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user!"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Define the static method on the schema
reviewSchema.statics.calcAvgRatings = async function (
  room: ObjectId
): Promise<void> {
  const stats = await this.aggregate([
    {
      $match: { room },
    },
    {
      $group: {
        _id: `$room`,
        ratingsNumbers: { $sum: 1 },
        ratingsAvg: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Room.findByIdAndUpdate(room, {
      ratingsQuantity: stats[0].ratingsNumbers,
      ratingsAverage: stats[0].ratingsAvg,
    });
  } else {
    await Room.findByIdAndUpdate(room, {
      ratingsQuantity: 0,
      ratingsAverage: 2, // Default value for ratingsAverage
    });
  }
};

// Use 'this.model' to call the static method from the post save hook
reviewSchema.post<ReviewDocument>("save", function () {
  (this.constructor as ReviewModel).calcAvgRatings(this.room);
});

// Use 'this' context typing for pre-hooks to correctly type 'newReview'

reviewSchema.pre<ReviewDocument>(/^findOneAnd/, async function (next) {
  // Typing 'this' to include the 'newReview' property
  if (this.newReview) {
    await (this.newReview.constructor as ReviewModel).calcAvgRatings(
      this.newReview.room
    );
  }
  next();
});

// Using 'this.newReview' to call the calcAvgRatings method
reviewSchema.post<ReviewDocument>(/^findOneAnd/, async function (doc) {
  if (!doc) return;
  await doc.constructor.calcAvgRatings(doc.room);
});

// Create and export the Review model
export const Review = model<ReviewDocument, ReviewModel>(
  "Review",
  reviewSchema
);
