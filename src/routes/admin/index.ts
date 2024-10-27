import { Request, Response } from "express";

import express from "express";
import { userRouter, usersRouter } from "./user";
import { balanceLogRoutes } from "./balanceLog";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Admin API is Running 🏃‍♂️");
});

router.use("/users" , usersRouter);
router.use("/user" , userRouter);
router.use("/balancelog" , balanceLogRoutes);

export default router;
