const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: Number },
    place: { type: String },
    address: { type: String },
    qualification: { type: String },
    passOutYear: { type: String },
    skillSet: { type: String },
    employmentStatus: { type: String },
    technologyTraining: { type: String },
    year: { type: Number },
    course: { type: String },
    photo: { type: String, default: "" },
    studentid: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    isStudent: { type: Boolean, default: true },
    isEmployee: { type: Boolean, default: false },
    isStudent: { type: Boolean, default: true },
    isPaid: { type: Boolean, default: false },
    fee: { type: Number, default: 00 },
    exitExamMark: { type: String, default: "NA" },
    isApproved: { type: Boolean, default: false },
    paymentDetails: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
