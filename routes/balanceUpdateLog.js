const express = require("express");
const {
  BalanceUpdateLogController,
} = require("../controllers/BalanceUpdateLog.controller");
const { checkAuthentication } = require("../middleware/Auth");
const router = express.Router();

router.get("/", BalanceUpdateLogController.getAll);
router.get("/:id", BalanceUpdateLogController.getById);
router.post("/", BalanceUpdateLogController.create);
router.patch("/:id", BalanceUpdateLogController.updateById);
router.delete("/:id", BalanceUpdateLogController.deleteById);

module.exports = router;
