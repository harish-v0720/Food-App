import express from "express";
import { createRestaurant, getRestaurant, getRestaurantOrder, getSingleRestaurant, searchRestaurant, updateOrderStatus, updateRestaurant } from "../controller/restaurant.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer";

const router = express.Router();

router.route("/").post(isAuthenticated, upload.single("imageFile") ,createRestaurant);
router.route("/").get(isAuthenticated, getRestaurant);
router.route("/").put(isAuthenticated, upload.single("imageFile") ,updateRestaurant);
router.route("/order").get(isAuthenticated, getRestaurantOrder);
router.route("/order/.:orderId/status").put(isAuthenticated, updateOrderStatus);
router.route("/search/:serachText").get(isAuthenticated, searchRestaurant);
router.route("/:id").get(isAuthenticated, getSingleRestaurant);

export default router;