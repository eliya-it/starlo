import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  resizeRoomPhotos,
  roomStatistics,
  updateRoom,
  uploadRoomPhotos,
} from "../controllers/roomsController";
import { protect, restrictTo } from "../controllers/authController";
import reviewRouter from "./reviewsRoutes";

const router = express.Router();
router.route("/room-info").get(protect, restrictTo("admin"), roomStatistics);
router.use("/:roomID/reviews", protect, reviewRouter);

router.route("/:slug").get(getRoom);

router
  .route("/")
  .get(getAllRooms)

  .post(
    protect,
    restrictTo("admin"),
    uploadRoomPhotos,
    resizeRoomPhotos,
    createRoom
  );
router
  .route("/:id")
  .delete(protect, restrictTo("admin"), deleteRoom)
  .patch(protect, updateRoom);

export default router;
