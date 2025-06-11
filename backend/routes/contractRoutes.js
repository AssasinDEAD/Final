const express = require("express");
const router = express.Router();
const contractController = require("../controllers/contractController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware());

router.post("/", contractController.createContract);
router.get("/", contractController.getContracts);
router.get("/:id", contractController.getContractById);
router.delete("/:id", contractController.deleteContract);
router.get("/:id/download", contractController.downloadContractFile);
router.post("/:id/sign", contractController.signContract);

module.exports = router;
