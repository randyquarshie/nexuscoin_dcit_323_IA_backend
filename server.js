const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./authRoutes");
const cryptoRoutes = require("./cryptoRoutes");

const app = express();

// CORS — allow all origins and handle preflight
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.) or any origin
    callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/nexuscoin";
mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.warn("⚠️  MongoDB connection failed. Using mock mode for development.");
    console.warn("   To use real database, install MongoDB locally or provide MongoDB Atlas URI");
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/crypto", cryptoRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "NexusCoin API is running. Use /api/health to check status." });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ message: "NexusCoin API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: "An error occurred",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 NexusCoin API Server running on http://localhost:${PORT}`);
  console.log(`📦 Deploy version: v4 - CORS fix applied`);
});
