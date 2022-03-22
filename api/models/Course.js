const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    fee: { type: Number, default: 0 },
    photo: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
