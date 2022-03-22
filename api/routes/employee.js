const router = require("express").Router();
const verify = require("../verifyToken");
const Employee = require("../models/Employee");

//Update

router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const updateEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateEmployee);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can updat your own account");
  }
});

//delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can delete your own account");
  }
});
//get

router.get("/find/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    const { password, ...info } = employee._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all employee
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const employee = await Employee.find();
      res.status(200).json(employee);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all employees!");
  }
});

// get approved employees
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const employee = await Employee.find({ isApproved: true });
      res.status(200).json(employee);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all employees!");
  }
});
//get employees pending approvel
router.get("/approve", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const employees = await Employee.find({ isApproved: false });
      res.status(200).json(employees);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed employees!");
  }
});

//approve
router.put("/approve/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updateEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        {
          isApproved: true,
        },
        { new: true }
      );

      res.status(200).json(updateEmployee);
    } catch {}
  } else {
    res.status(403).json("You are not allowed employees!");
  }
});
module.exports = router;
