"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleRestaurant = exports.searchRestaurant = exports.updateOrderStatus = exports.getRestaurantOrder = exports.updateRestaurant = exports.getRestaurant = exports.createRestaurant = void 0;
const restaurant_model_1 = require("../models/restaurant.model");
const imageUpload_1 = __importDefault(require("../utils/imageUpload"));
const order_model_1 = require("../models/order.model");
const createRestaurant = async (req, res, next) => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = await restaurant_model_1.Restaurant.findOne({ user: req.id });
        if (restaurant) {
            res.status(400).json({
                success: false,
                message: "Restaurant already exist for this user"
            });
        }
        if (!file) {
            res.status(400).json({
                success: false,
                message: "Image is Required"
            });
        }
        const imageUrl = await (0, imageUpload_1.default)(file);
        await restaurant_model_1.Restaurant.create({
            user: req.id,
            restaurantName,
            city,
            country,
            deliveryTime,
            cuisines: JSON.parse(cuisines),
            imageUrl
        });
        res.status(201).json({
            success: true,
            message: "Restaurant Added"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createRestaurant = createRestaurant;
const getRestaurant = async (req, res, next) => {
    try {
        const restaurant = await restaurant_model_1.Restaurant.find({ user: req.id });
        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found",
            });
        }
        ;
        res.status(200).json({ success: true, restaurant });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getRestaurant = getRestaurant;
const updateRestaurant = async (req, res) => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = await restaurant_model_1.Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            throw new Error("Restaurant not found");
        }
        ;
        restaurant.restaurantName = restaurantName;
        restaurant.city = city;
        restaurant.country = country;
        restaurant.deliveryTime = deliveryTime;
        restaurant.cuisines = JSON.parse(cuisines);
        if (file) {
            const imageUrl = await (0, imageUpload_1.default)(file);
            restaurant.imageUrl = imageUrl;
        }
        await restaurant?.save();
        res.status(200).json({
            success: true,
            message: "Restaurant updated",
            restaurant,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateRestaurant = updateRestaurant;
const getRestaurantOrder = async (req, res, next) => {
    try {
        const restaurant = await restaurant_model_1.Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            throw new Error("Restaurant not found");
        }
        ;
        const orders = await order_model_1.Order.find({ restaurant: restaurant._id }).populate('restaurant').populate('user');
        res.status(200).json({
            success: true,
            orders
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getRestaurantOrder = getRestaurantOrder;
const updateOrderStatus = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await order_model_1.Order.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        order.status = status;
        await order?.save();
        res.status(200).json({
            success: true,
            message: "Status Updated",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateOrderStatus = updateOrderStatus;
const searchRestaurant = async (req, res, next) => {
    try {
        const searchText = req.params.searchText || "";
        const searchQuery = req.query.searchQuery || "";
        const selectedCuisines = (req.query.selectedCuisines || "").split(",").filter(cuisine => cuisine);
        const query = {};
        // b asic search based on searchText (name,city,country)
        if (searchText) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { country: { $regex: searchText, $options: 'i' } }
            ];
        }
        // filter on the basis of searchQuery
        if (searchQuery) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: 'i' } },
                { cuisines: { $regex: searchText, $options: 'i' } },
            ];
        }
        ["momos", "burger"];
        if (selectedCuisines.length > 0) {
            query.cuisines = { $in: selectedCuisines };
        }
        const restaurants = await restaurant_model_1.Restaurant.find(query);
        res.status(200).json({
            success: true,
            data: restaurants,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.searchRestaurant = searchRestaurant;
const getSingleRestaurant = async (req, res, next) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await restaurant_model_1.Restaurant.findById(restaurantId).populate({
            path: 'menus',
            options: { createdAt: -1 }
        });
        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found",
            });
        }
        ;
        res.status(200).json({
            restaurant
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getSingleRestaurant = getSingleRestaurant;
