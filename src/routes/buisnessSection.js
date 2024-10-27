const BuisnessSectionController = require("../controllers/BuisnessSection.controller");
const express = require("express");
const { checkAuthentication } = require("../middleware/Auth");

const router = express.Router();
router.get("/", BuisnessSectionController.getAllWithoutFile);
router.get(
  "/withFiles",
  checkAuthentication,
  BuisnessSectionController.getAllWithoutFile
);

module.exports = router;
