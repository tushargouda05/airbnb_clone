require("dotenv").config();
const cors = require("cors");
const fs = require("fs");
const express = require("express");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const cloudinary = require("cloudinary").v2;
const connectwithDB = require("./config/db.js");

connectwithDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Temp folder for multer uploads
fs.mkdirSync("uploads", { recursive: true });

const app = express();

if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    maxAge: Number(process.env.COOKIE_MAX_AGE || 1) * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  })
);

// Routes
app.use("/", require("./routes/index.js"));          // /upload-photo, /upload-photos
app.use("/user", require("./routes/user.js"));       // /user/login, /user/register ...
app.use("/bookings", require("./routes/booking.js")); // /bookings/create-booking ...
app.use("/places", require("./routes/place.js"));    // /places ...

// Error handler (keeps errors as JSON)
app.use((err, req, res, next) => {
  const status = err.name === "MulterError" ? 400 : err.status || 500;
  res.status(status).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
