const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/me", authMiddleware(), authController.getMe);
router.post("/login", authController.login);
router.post("/logout", authMiddleware(), authController.logout);

module.exports = router;
