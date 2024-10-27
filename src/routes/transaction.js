const express = require("express");
const TransactionController = require("../controllers/Transaction.controller");
const { checkAuthentication, checkIsActive } = require("../middleware/Auth");
const router = express.Router();

router.get("/", checkAuthentication, TransactionController.list);

router.post("/deposit", checkAuthentication, checkIsActive, TransactionController.deposit);




router.post(
  '/withdraw',
  checkAuthentication,
  checkIsActive,
  TransactionController.withdraw
);


module.exports = router;
