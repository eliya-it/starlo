import { Document, model, ObjectId, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export interface UserDocument extends Document {
  id: ObjectId;
  name: string;
  email: string;
  photo: string;
  bookingsCount: number;
  hasBookings: boolean;
  isVerified: boolean;
  isTwoFa: boolean;
  joined: Date;
  passwordChangedAt: Date;
  emailToken: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  secretToken: string | undefined;
  passwordResetToken: string | undefined;
  sendTwoFactorRequestToken: string | undefined;
  twoFactorAuthSecret: string;
  passwordResetExpires: number | undefined;
  role: "user" | "admin";
  correctPassword(
    password: string,
    candidatePassword: string
  ): Promise<boolean>;
  createPasswordResetToken(): boolean;
  changedPasswordAfter(num: number): boolean;
}
const userSchema: Schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "A user must have a name!"],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "A user must have a email!"],
  },
  photo: {
    type: String,
    trim: true,
    default: "user.png",
  },
  role: {
    type: String,
    default: "user",
  },
  password: {
    type: String,
    required: [true, "A user must have a password!"],
    minLength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,

    required: [true, "Please Confirm your password!"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el: string): boolean {
        return true;
      },
      message: "Passwords are not the same!",
    },
  },
  hasBookings: {
    type: Boolean,
    default: false,
  },
  bookingsCount: Number,
  secretToken: String,
  joined: {
    type: Date,
    default: Date.now(),
  },
  passwordChangedAt: {
    type: Date,
  },
  emailToken: String,

  isVerified: {
    type: Boolean,
    default: false,
  },
  isTwoFa: {
    type: Boolean,
    default: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  sendTwoFactorRequestToken: String,
  twoFactorAuthSecret: String,
});
userSchema.pre<UserDocument>("save", async function (next) {
  // To run this function if password was modified
  if (!this.isModified("password")) return next();

  if (this.password !== this.confirmPassword) {
    return next(new Error("Passwords do not match!"));
  }
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  } else {
    throw new Error("Password is undefined");
  }
  // Delete confirmPassword before saving it to DB
  this.confirmPassword = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (
  JWTTimestamp: number
): boolean {
  const user = this as UserDocument;
  if (user.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      user.passwordChangedAt.getTime() / 1000
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false; // This means the password is not changed
};
userSchema.methods.createPasswordResetToken = function () {
  const user = this as UserDocument;
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
export const User = model<UserDocument>("User", userSchema);
