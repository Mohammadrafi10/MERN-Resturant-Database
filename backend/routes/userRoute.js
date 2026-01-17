const express = require("express");
const { register, login, getUser, getMe, logout, changePassword } = require("../controller/userController");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const { loginLimiter } = require("../middlewares/rateLimiter");
const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", loginLimiter, login);

// Protected routes - specific routes before parameterized routes
router.get("/me", auth, getMe);
router.post("/logout", auth, logout);
router.put("/change-password", auth, changePassword);
router.get("/:id", auth, isAdmin, getUser);

module.exports = router;