const express = require("express");
const router = express.Router();

// middleware (you should already have these)
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");

// =======================
// 📝 ADD TASK ROUTE (ADMIN ONLY)
// =======================
router.post("/add-task", verifyToken, isAdmin, (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ msg: "All fields required" });
  }

  // TODO: save to DB here
  console.log("Task created:", title);

  res.json({ msg: "Task added successfully" });
});

module.exports = router;