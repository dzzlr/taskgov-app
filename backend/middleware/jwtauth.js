const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY; // Pastikan gunakan variabel lingkungan di produksi

// Middleware untuk otorisasi
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { authenticate };
