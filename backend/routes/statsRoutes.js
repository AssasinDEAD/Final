const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/overview", authMiddleware(
  ["admin", "career_center"]
), statsController.getStats);

module.exports = router;