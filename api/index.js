const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const studentRoute = require("./routes/student");
const employeeRoute = require("./routes/employee");
const courseRoute = require("./routes/course");
const paymentRoute = require("./routes/payment");
const path = require("path");
const multer = require("multer");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    autoIndex: true, //make this also true
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
  console.log("uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/student", studentRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/course", courseRoute);
app.use("/api/payment", paymentRoute);

app.listen(process.env.PORT || 5000, () => console.log("server started"));
