const express = require("express");
const { authenticate } = require("../middleware/jwtauth");

const router = express.Router();

// Mengecek apakah user masih login
router.get("/auth-check", authenticate, (req, res) => {
  res.json({ username: req.user.username });
});

module.exports = router;