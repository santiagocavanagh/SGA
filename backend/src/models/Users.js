const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false },
    rol: { type: String, enum: ["admin", "user"], default: "user" },
  },
  {
    versionKey: false,
  },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
