import express from "express";
import {
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  signup,
  updatePassword,
} from "../controllers/authController";

import bookingRouter from "./bookingRoutes";
import {
  getMe,
  getUser,
  resizeUserPhoto,
  updateMe,
  uploadUserphoto,
} from "../controllers/userController";

const router = express.Router();
router.use("/:roomId/booking", bookingRouter);
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.use(protect);

router.patch("/updateMyPassword", updatePassword);
router.get("/me", getMe, getUser);
router.patch("/updateMe", uploadUserphoto, resizeUserPhoto, updateMe);
router.get("/logout", logout);

export default router;
