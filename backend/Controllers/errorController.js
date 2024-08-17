const AppError = require("../utils/appError");
const handleDublicatedFieldsDB = (req, res, err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value.includes("@"));

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
const handleIncorrectCreds = (err, req, res) => {
  if (!req.originalUrl.startsWith("/api")) {
    res.status(400).render("home/login", {
      errMsg: "Incorrect email or password",
    });
  }
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleJWTError = () => {
  return new AppError("Invalid token. Please login again!", 401);
};
const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
  });
};
const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    if (error.name === "CastError") error = handleCastErrorDB(err);
    if (error.code === 11000) error = handleDublicatedFieldsDB(req, res, err);
    if (error.name === "ValidationError") error = handleValidationErrorDB(err);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
