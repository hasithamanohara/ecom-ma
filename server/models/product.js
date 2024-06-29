const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tiele: { type: String, required: true },
    description: { type: String, required: true },
    oldPrice: { type: Number, required: true },
    imageUrl: { type: [String], required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    sizes: {
      type: [
        {
          size: { type: String, required: true },
          isSelected: { type: Boolean, required: false, default: false },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
