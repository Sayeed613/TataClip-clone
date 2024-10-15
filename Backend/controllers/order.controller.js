import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
const placeOrderCod = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderdata = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = await new OrderModel(orderdata);
    await newOrder.save();
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });
    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const userOrderData = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await OrderModel.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const allOrders = async (req, res) => {
  try {
    console.log("Fetching all orders...");
    const orders = await OrderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const placeOrderStrip = async (req, res) => {};
const placeOrderRazor = async (req, res) => {};

// admin
const updateOrderStatus = async (req, res) => {
  try{
    const { orderId, status } = req.body;
    await OrderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: "Order status updated" });
  }catch(error){
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  placeOrderCod,
  placeOrderStrip,
  placeOrderRazor,
  allOrders,
  userOrderData,
  updateOrderStatus,
};
