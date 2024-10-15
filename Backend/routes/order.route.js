import express from "express";
import {
  placeOrderCod,
  placeOrderStrip,
  placeOrderRazor,
  allOrders,
  userOrderData,
  updateOrderStatus,
} from "../controllers/order.controller.js";

import adminAuth from "../middleware/admin.middleware.js";
import authUser from "../middleware/auth.middleware.js";

const orderRouter = express.Router();
// admin features
orderRouter.get("/all-orders", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);
// payment features
orderRouter.post("/place", authUser, placeOrderCod);
orderRouter.post("/stripe", authUser, placeOrderStrip);
orderRouter.post("/razorpay", authUser, placeOrderRazor);
// user features
orderRouter.post("/user-orders", authUser, userOrderData);

export default orderRouter;
