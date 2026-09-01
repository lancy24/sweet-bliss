const Order = require("../models/Order");

// POST /api/orders — place order
const placeOrder = async (req, res) => {
  try {
    const {
      customerName, phone, address,
      city, pincode, paymentMethod,
      orderItems, totalPrice, discount, finalPrice,
    } = req.body;

    if (!customerName || !phone || !address || !orderItems?.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const order = new Order({
      customerName, phone, address,
      city, pincode, paymentMethod,
      orderItems, totalPrice, discount, finalPrice,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders — get all orders (admin)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// PUT /api/orders/:id — update order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = req.body.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { placeOrder, getOrders, updateOrderStatus };