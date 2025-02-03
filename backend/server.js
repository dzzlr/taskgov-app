// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();

// const findingsRoutes = require("./routes/findings");

// const app = express();
// const PORT = process.env.PORT;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use("/api/findings", findingsRoutes);

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

const findingsRoutes = require("./routes/findings");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api/findings", findingsRoutes);
app.use("/api", authRoutes);
app.use("/api", protectedRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
