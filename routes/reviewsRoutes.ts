import express, { Router } from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createReview,
  deleteReview,
  getReviews,
  getRoomReviews,
  updateReview,
} from "../controllers/reviewsController";
const router = Router({ mergeParams: true });

router.get("/", getReviews);
router.get("/:id", getRoomReviews);
router.use(protect, restrictTo("user"));
router.route("/:id").post(createReview);
router.use(restrictTo("user"));
router.route("/:id").patch(updateReview).delete(deleteReview);

export default router;
