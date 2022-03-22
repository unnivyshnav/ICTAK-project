const router = require("express").Router();
const verify = require("../verifyToken");
const Student = require("../models/Student");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// gmail access
const CLIENT_ID =
  "589697857291-ltkmvfhnp51d8fcgqmlq2ed0ra55tqvh.apps.googleusercontent.com";
const CLEINT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04GGoXF3WBIRmCgYIARAAGAQSNwF-L9IrB1OGpGEjqBq224W2FVdQnMZNWikc9D0ds5OCbJRhb7zXmOcU0k8-jleQ8dmCYm7RMDo";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Update

router.put("/:id", verify, async (req, res) => {
  if (
    req.user.id === req.params.id ||
    req.user.isAdmin ||
    req.user.isEmployee
  ) {
    try {
      const updateStudent = await Student.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateStudent);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can updat your own account");
  }
});

//delete original

router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await Student.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can delete your own account");
  }
});

//get all students
router.get("/all", verify, async (req, res) => {
  if (req.user.isAdmin || req.user.isEmployee) {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Unauthorized");
  }
});
//get a student
router.get("/find/:id", verify, async (req, res) => {
  if (req.user.isAdmin || req.user.isEmployee || req.user.id === req.params.id)
    try {
      const student = await Student.findById(req.params.id);
      const { password, ...info } = student._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
});
//get approved students
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin || req.user.isEmployee) {
    try {
      const students = await Student.find({ isApproved: true });
      res.status(200).json(students);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all students!");
  }
});

//get students pending approvel original
router.get("/approve", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const students = await Student.find({ isApproved: false });
      res.status(200).json(students);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see the students");
  }
});

//approve student
router.put("/approve/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updateStudent = await Student.findByIdAndUpdate(
        req.params.id,
        {
          isApproved: true,
        },
        { new: true }
      );
      const student = await Student.findById(req.params.id);
      var studentID = student._id.toString();
      studentID = studentID.substring(7, 11);
      console.log(studentID);
      var studentCourse = student.course;
      studentCourse = studentCourse.substring(0, 4);
      studentID = studentCourse + studentID;
      const updateStudentID = await Student.findByIdAndUpdate(
        req.params.id,
        {
          studentid: studentID,
        },
        { new: true }
      );
      res.status(200).json(updateStudent);
      const mailid = student.email;
      const message = `<h3>Congratulations ${student.name}.</h3><h4>You have been successfully enrolled for ${student.course}. Your payment of rupees ${student.fee} is successful. Enrollment ID is: ${updateStudentID.studentid}</h4><br><h4>Regards,</h4><br><h3>Team ICTAK</h3>   `;
      const sub = "Successfully Enrolled to ICTAK";
      console.log(mailid);
      async function sendMail() {
        try {
          const accessToken = await oAuth2Client.getAccessToken();

          const transport = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
              type: "OAuth2",
              user: "ictak.enrollment@gmail.com",
              clientId: CLIENT_ID,
              clientSecret: CLEINT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken,
            },
            tls: { rejectUnauthorized: false },
          });

          const mailOptions = {
            from: "ICTAK Academy <ictak.enrollment@gmail.com>",
            to: mailid,
            subject: sub,
            text: message,
            html: message,
          };

          const result = await transport.sendMail(mailOptions);
          return result;
        } catch (error) {
          return error;
        }
      }

      sendMail();
      // .then((result) => res.json("response Mail Sent Succesfully"))
      // .catch((error) => res.json("response Heading Something Went Wrong"));
    } catch (err) {
      //   res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can updat your own account");
  }
});

module.exports = router;
