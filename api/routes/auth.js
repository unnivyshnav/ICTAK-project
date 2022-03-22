const router = require("express").Router();
const Student = require("../models/Student");
const Employee = require("../models/Employee");
const Admin = require("../models/Admin");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Student Registration
router.post("/student-register", async (req, res) => {
  const newStudent = new Student({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    address: req.body.address,
    phone: req.body.phone,
    qualification: req.body.qualification,
    passOutYear: req.body.passOutYear,
    skillSet: req.body.skillSet,
    employmentStatus: req.body.employmentStatus,
    technologyTraining: req.body.technologyTraining,
    year: req.body.year,
    course: req.body.course,
    photo: req.body.photo,
    place: req.body.place,
    fee: req.body.fee,
  });
  console.log(newStudent);

  try {
    const student = await newStudent.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500);
  }
});

//Employee registration
router.post("/employee-register", async (req, res) => {
  const newEmployee = new Employee({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    photo: req.body.photo,
    phone: req.body.phone,
    address: req.body.address,
    role: req.body.role,
  });

  try {
    const employee = await newEmployee.save();
    res.json(employee);
  } catch (err) {
    res.status(500);
  }
});

//Student Login
router.post("/login/student", async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.body.email });
    !student && res.status(401).json("Wrong Password or Username");

    const bytes = CryptoJS.AES.decrypt(
      student.password,
      process.env.SECRET_KEY
    );
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(401).json("Wrong Password or Username");
    !student.isApproved && res.status(403).json("Not Approved by admin");
    const accessToken = jwt.sign(
      {
        id: student._id,
        isAdmin: student.isAdmin,
        isStudent: student.isStudent,
        isEmployee: student.isEmployee,
      },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    const { password, ...info } = student._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    // res.status(500).json(err);
  }
});

//Employee Login
router.post("/login/employee", async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.body.email });
    !employee && res.status(401).json("Wrong Password or Username");

    const bytes = CryptoJS.AES.decrypt(
      employee.password,
      process.env.SECRET_KEY
    );
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(401).json("Wrong Password or Username");
    const accessToken = jwt.sign(
      {
        id: employee._id,
        isAdmin: employee.isAdmin,
        isStudent: employee.isStudent,
        isEmployee: employee.isEmployee,
      },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    const { password, ...info } = employee._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    // res.status(500).json(err);
  }
});

//Admin login
router.post("/login/admin", async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.body.username });
    !admin && res.status(401).json("Wrong Password or Username");

    const bytes = CryptoJS.AES.decrypt(admin.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      admin.password !== req.body.password &&
      res.status(401).json("Wrong Password or Username");
    const accessToken = jwt.sign(
      {
        id: admin._id,
        isAdmin: admin.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    const { password, ...info } = admin._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    // res.status(500).json(err);
  }
});

module.exports = router;
