const express = require("express");
const router = express.Router();
const companyProfileController = require("../controllers/companyProfileController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/available", authMiddleware("student"), companyProfileController.getAvailableCompanies);
router.get("/me", authMiddleware("company"), companyProfileController.getMyCompanyProfile);
router.get("/", authMiddleware("career_center"), companyProfileController.getAllCompanyProfiles);
router.get("/:id", authMiddleware(), companyProfileController.getCompanyProfile);
router.put("/", authMiddleware("company"), companyProfileController.upsertCompanyProfile);
router.delete("/:id", authMiddleware("company"), companyProfileController.deleteCompanyProfile);

module.exports = router;
