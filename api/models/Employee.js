const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String },
    role: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: Number },
    address: { type: String },
    photo: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    isEmployee: { type: Boolean, default: true },
    isStudent: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
