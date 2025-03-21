import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

const handleDublicatedFieldsDB = (
  req: Request,
  res: Response,
  err: any
): AppError | Response => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  let message;
  if (value.includes("@")) {
    message = `There is already a user with ${value}.`;
    return res.status(409).json({
      status: "fail",
      message,
    });
  }
  message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: any): AppError => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleCastErrorDB = (err: any): AppError => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleJWTError = (): AppError => {
  return new AppError("Invalid token. Please login again!", 401);
};

const handleJWTExpiredError = (): AppError => {
  return new AppError("Your token has expired! Please log in again.", 401);
};

const sendErrorDev = (err: any, req: Request, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
  });
};

const sendErrorProd = (err: any, req: Request, res: Response): void => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
    });
  }
};

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    console.error(error);
    if (error.name === "CastError") error = handleCastErrorDB(err);
    if (error.code === 11000) error = handleDublicatedFieldsDB(req, res, err);
    if (error.name === "ValidationError") error = handleValidationErrorDB(err);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};

export default globalErrorHandler;
