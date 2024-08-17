const express = require("express");
const reviewsController = require("../Controllers/reviewsController");
const authController = require("../Controllers/authController");
const router = express.Router({ mergeParams: true });

router.get(reviewsController.getReviews);
router.get("/:id", reviewsController.getRoomReviews);
router.use(authController.protect, authController.restrictTo("user"));
router.route("/").post(reviewsController.createReview);
router.use(authController.restrictTo("user"));
router
  .route("/:id")

  .patch(reviewsController.updateReview)
  .delete(reviewsController.deleteOne);

module.exports = router;
