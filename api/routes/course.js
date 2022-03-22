const router = require("express").Router();
const verify = require("../verifyToken");
const Course = require("../models/Course");

// create course
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newCourse = new Course(req.body);
    try {
      const savedCourse = await newCourse.save();
      res.status(200).json(savedCourse);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Only admin can add course");
  }
});

//Update
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updateCourse = await Course.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateCourse);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Only admin can update course");
  }
});

// delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Course.findByIdAndDelete(req.params.id);
      res.status(200).json("Course has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Only admin can delete a course");
  }
});

//get
router.get("/find/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
