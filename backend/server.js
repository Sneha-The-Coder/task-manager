const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());

/* ---------------- TEST ROUTE ---------------- */
app.get("/", (req, res) => {
  res.send("Task Manager API Running 🚀");
});

/* ---------------- ROUTES (SAFE IMPORTS) ---------------- */
try {
  const authRoutes = require("./routes/auth");
  app.use("/api/auth", authRoutes);
} catch (err) {
  console.log("❌ Auth route error:", err.message);
}

try {
  const taskRoutes = require("./routes/taskRoutes");
  app.use("/api", taskRoutes);
} catch (err) {
  console.log("❌ Task route error:", err.message);
}

/* ---------------- DATABASE ---------------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});