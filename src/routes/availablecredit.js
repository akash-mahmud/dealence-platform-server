const express = require("express");
const {AvailableCreditController} = require("../controllers/AvailableCredit.controller");
const { checkAuthentication } = require("../middleware/Auth");
const router = express.Router();

router.get("/",  AvailableCreditController.getAll);
router.get("/:id",  AvailableCreditController.getById);
router.post("/",  AvailableCreditController.create);
router.patch("/:id",  AvailableCreditController.updateById);
router.delete("/:id",  AvailableCreditController.deleteById);

module.exports = router;
