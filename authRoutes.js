const express = require("express");
const router = express.Router();
const authController = require("./authController");
const { protectRoute } = require("./authMiddleware");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Protected routes
router.get("/profile", protectRoute, authController.getProfile);
router.post("/deposit", protectRoute, authController.deposit);
router.post("/withdraw", protectRoute, authController.withdraw);

module.exports = router;
