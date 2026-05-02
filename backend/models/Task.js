const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    default: "pending"
  },
  assignedEmail: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Task", taskSchema);
module.exports = mongoose.model("Task", taskSchema);