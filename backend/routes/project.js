const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// Create Project (Admin only)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can create project" });
    }

    const project = new Project({
      name: req.body.name,
      createdBy: req.user.id
    });

    await project.save();
    res.json(project);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all projects
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching projects" });
  }
});

module.exports = router;