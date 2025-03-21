import crypto from "crypto";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

import { User, UserDocument } from "../models/userModule";

import { ObjectId } from "mongoose";
import { NextFunction, Request, RequestHandler, Response } from "express";
import redis from "../utils/redis";
import { log, promisify } from "util";

const signToken = (id: ObjectId | undefined) => {
  if (id) {
    const expiresIn = "3d";

    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn });
  }
};

const createSendToken = (
  user: UserDocument,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const token = signToken(user._id);
  user.password = undefined;
  const expiresIn = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3);

  res.status(statusCode).json({
    status: "success",
    token,
    photo: user.photo,
    name: user.name,
    role: user.role,
    id: user._id,
    expiresIn,
  });
};

interface SignupBody {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export const signup: RequestHandler<{}, {}, SignupBody> = catchAsync(
  async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    // Validate required fields
    if (!name || !email || !password || !confirmPassword) {
      return next(new AppError("All fields are required", 400));
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });
    console.log(newUser, " --- New user");

    // Send token to the client
    createSendToken(newUser, 201, req, res);
  }
);
interface LoginRequestBody {
  email: string;
  password: string;
}
export const login: RequestHandler<{}, {}, LoginRequestBody> = catchAsync(
  async (req, res, next) => {
    const { email, password } = req.body;
    if (!email) return next(new AppError("Please provide an email!", 400));
    if (!password)
      return next(new AppError("Please provide an password!", 400));
    const curUser = await User.findOne({ email }).select("+password");

    if (
      !curUser ||
      !(await curUser.correctPassword(password, curUser.password!))
    ) {
      return next(new AppError(`Incorrect email or password!`, 401));
    }
    console.log(curUser, "--- Cur user");

    createSendToken(curUser, 200, req, res);
  }
);
interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}
export const protect: RequestHandler = catchAsync(async (req, res, next) => {
  let token: string | undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please login to have access.", 401)
    );
  }
  // let decoded: DecodedToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

  const cachedUser = await redis.get(`session:${decoded.id}`);

  if (cachedUser) {
    req.user = User.hydrate(JSON.parse(cachedUser));
    console.log(`Cached User: `, JSON.parse(cachedUser));

    return next();
  }
  const curUser = await User.findById(decoded.id);

  if (!curUser)
    return next(
      new AppError("The user belonging to this token does not exists!", 401)
    );
  if (curUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "User recently changed his password! Please login again>",
        401
      )
    );
  }
  console.log("Cur auth user", curUser);

  await redis.setEx(`session:${decoded.id}`, 86400, JSON.stringify(curUser));
  req.user = curUser;

  next();
});

export const forgotPassword: RequestHandler<{}, {}, { email: string }> =
  catchAsync(async (req, res, next) => {
    const email = req.body.email;
    if (!email) return next(new AppError("Please provide email!", 401));
    const user = await User.findOne({ email });

    if (!user)
      return next(new AppError("No user found with this email address!", 404));
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;
    const message = `If you forgot your password submit a PATCH request with your new password to this link ${resetURL},
     If you don't, Please ignore this message`;
    res.status(200).json({
      status: "success",
      message,
    });
  });
interface ResetPasswordBody {
  password: string;
  confirmPassword: string;
}
export const resetPassword: RequestHandler<{}, {}, ResetPasswordBody> =
  catchAsync(async (req, res, next) => {
    if (!req.params.token)
      return next(new AppError("Please provide a token", 400));
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user)
      return next(new AppError("Token is invalid or has expired", 400));
    const { password, confirmPassword } = req.body;
    if (!password)
      return next(new AppError("Please provide a password field.", 400));
    if (!confirmPassword)
      return next(new AppError("Please provide a confirmPassword field.", 400));
    user.password = password;
    user.confirmPassword = confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });
    createSendToken(user, 200, req, res);
  });
interface UpdatePasswordBody {
  currentPassword: string;
  newPassword: string;
  newConfirmPassword: string;
}
export const updatePassword: RequestHandler<{}, {}, UpdatePasswordBody> =
  catchAsync(async (req, res, next) => {
    const { currentPassword, newPassword, newConfirmPassword } = req.body;

    if (!currentPassword)
      return next(new AppError("Please provide current password!", 400));
    if (!newPassword)
      return next(new AppError("Please provide new password!", 400));
    if (!newConfirmPassword)
      return next(new AppError("Please provide new confirm password!", 400));

    const user = await User.findById(req.user.id).select("+password");
    if (!user) return next(new AppError("User not found!", 404));
    if (!(await user.correctPassword(currentPassword, user.password!))) {
      return next(new AppError("Incorrect password. Please try again!", 401));
    }
    user.password = newPassword;
    user.confirmPassword = newConfirmPassword;
    await redis.del(`session:${req.user.id}`);
    await user.save();
    createSendToken(user, 200, req, res);
  });

export const logout: RequestHandler = catchAsync(async (req, res) => {
  console.log(req.user.id);

  await redis.del(`session:${req.user.id}`);
  res
    .cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 1000),
      httpOnly: true,
    })
    .json({
      status: "success",
    });
});
export const restrictTo = (...roles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

export const verifyEmail = catchAsync(async (req, res, next) => {
  const token = req.params.token;
  if (!token) return next(new AppError("Please provide a token!", 400));
  const curUser = await User.findOne({ emailToken: req.params.token });
  if (!curUser) {
    return next(
      new AppError("No user found with this token. Please try again!", 404)
    );
  }
  curUser.emailToken = undefined;
  curUser.isVerified = true;
  await curUser.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: "Account Verfied successfully",
    data: {
      curUser,
    },
  });
});
