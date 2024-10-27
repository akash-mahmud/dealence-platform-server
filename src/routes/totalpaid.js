const express = require("express");
const {
  TotalPaidController,
} = require("../controllers/TotalPaid.controller");
const { checkAuthentication } = require("../middleware/Auth");
const router = express.Router();

router.post("/chart", TotalPaidController.getAll); 
router.get("/:id", TotalPaidController.getById);
router.post("/", TotalPaidController.create);
router.patch("/:id", TotalPaidController.updateById);
router.delete("/:id", TotalPaidController.deleteById);

module.exports = router;
