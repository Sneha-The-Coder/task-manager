const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

/* ---------------- CREATE TASK ---------------- */
router.post("/tasks", auth, async (req, res) => {
  try {
    const { title, status, assignedEmail } = req.body;

    const task = await Task.create({
      title,
      status: status || "pending",
      assignedEmail
    });

    res.json(task);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ---------------- GET TASKS ---------------- */
router.get("/tasks", auth, async (req, res) => {
  try {
    const { email, role } = req.query;

    let tasks;

    if (role === "admin") {
      tasks = await Task.find();
    } else {
      tasks = await Task.find({ assignedEmail: email });
    }

    res.json(tasks);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ---------------- UPDATE TASK STATUS ---------------- */
router.put("/tasks/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(task);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;