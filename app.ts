import morgan from "morgan";
import express, { RequestHandler } from "express";
import roomsRouter from "./routes/roomsRoutes";
import userRouter from "./routes/userRoutes";
import reviewsRouter from "./routes/reviewsRoutes";
import bookingsRouter from "./routes/bookingRoutes";
// import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import helmet from "helmet";
import path from "path";
import { urlencoded } from "express";
import expressMongoSanitize from "express-mongo-sanitize";
import globalErrorHandler from "./controllers/errorController";
import hpp from "hpp";
import cors from "cors";
import AppError from "./utils/appError";
import { checkEnvVariables } from "./utils/utils";
import { getAllRooms } from "./controllers/roomsController";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redis from "./utils/redis";
checkEnvVariables();
const app = express();

app.set("trust proxy", 1);

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// To parse the body
app.use(express.json());

// To serve static files
app.use(express.static(path.join(__dirname, "public")));

// Set security HTTP headers
app.use(helmet());
// Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Limti requests from same IP
const limiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.sendCommand(args),
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use("/api", limiter);
// Body Parser  reding  data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(urlencoded({ extended: true, limit: "10kb" }));

// Protection against NoSql query injection !!!!!
app.use(expressMongoSanitize());
// Protection against XSS  !!!!!
app.use(xss());
// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ["ratingsQuantity", "ratingsAverage", "price", "search"],
  })
);
const logServerInfo: RequestHandler = (req, res, next) => {
  const serverName = process.env.SERVER_NAME || "Unknown Server"; // Use a unique identifier per backend instance
  console.log(
    `Request handled by: ${serverName} - ${req.method} ${req.originalUrl}`
  );
  next();
};

app.use(logServerInfo);

app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewsRouter);
app.use("/api/v1/book", bookingsRouter);
app.get("/healthcheck", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "System is online",
  });
});

app.all("*", (req, res, next) => {
  return next(
    new AppError("This page does not exists on the current server", 404)
  );
});
app.use(globalErrorHandler);
export default app;
