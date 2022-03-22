const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    photo: { type: String, defalut: "" },
    isEmployee: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: true },
    isStudent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);
