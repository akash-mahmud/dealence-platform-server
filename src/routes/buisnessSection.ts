import {
  createOne,
  deleteOne,
  findOne,
  findOneWithFiles,
  getAll,
  getAllWithoutFile,
  updateOne,
} from "../controllers/BuisnessSection.controller";

import express from "express";
const { checkAuthentication } = require("../middleware/Auth");

const buisnessSectionRouter = express.Router();
buisnessSectionRouter.get("/withFiles", getAll);

buisnessSectionRouter.get("/", getAllWithoutFile);
buisnessSectionRouter.get(
  "/withFiles/:id",

  findOneWithFiles
);
buisnessSectionRouter.get("/:id", findOne);

buisnessSectionRouter.post("/", createOne);
buisnessSectionRouter.patch("/:id", updateOne);
buisnessSectionRouter.delete("/:id", deleteOne);

export { buisnessSectionRouter };
