const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    customerID: { type: String, required: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    quantity: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentStatus: { type: Boolean, required: true },
    deliveryStatus: { type: String, required: true, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
