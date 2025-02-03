const express = require("express");
const jwt = require("jsonwebtoken");
const { readUsers } = require("../utils/helpers");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY; // Gunakan env variable di produksi

// Login endpoint
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true });

  res.json({ message: "Login successful" });
});

// Logout endpoint
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

module.exports = router;