
const ContractController = require("../controllers/Contract");
const express = require("express");
const { checkAuthentication } = require("../middleware/Auth");

const router = express.Router();
router.post("/getbalance", checkAuthentication, ContractController.getBalanceByContract);
router.post("/getavailablecredit", checkAuthentication, ContractController.getAvailableCreditByContract);

module.exports = router;
