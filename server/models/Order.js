const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        size: { type: String, default: "" },
        image: { type: String, default: "" },
      },
    ],
    totalPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);