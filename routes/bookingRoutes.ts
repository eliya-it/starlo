import express from "express";
import {
  createBook,
  deleteBook,
  getBooks,
  setRoomData,
} from "../controllers/bookingController";
import { protect, restrictTo } from "../controllers/authController";

const router = express.Router({ mergeParams: true });
router.use(protect, restrictTo("user"));
router.route("/").get(getBooks).post(setRoomData, createBook);

router.route("/:id").delete(deleteBook);
export default router;
