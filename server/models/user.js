const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true, default: "Sri Lanka" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchemaSchemaSchema);
