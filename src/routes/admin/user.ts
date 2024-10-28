import express from "express";
import { dataRoutes } from "./data";
import { verifiedUserRoutes } from "./verified";
import { usersController } from "../../controllers/admin/users";
import { userController } from "../../controllers/admin/user.controller";
const { delete: DeleteUser, getAll, search, discardUser } = usersController;
const {
  addUserTransaction,
  updateAvailableCredit,
  updateBlancelog,
  updateIncrement,
  updateTotalpaidId,
  updateUserDetails,
  updateplan,
  getUserAccountDetails,
  getInvestment,
  getUserInvestments,
} = userController;
const userRouter = express.Router();
const usersRouter = express.Router();
/**
 *  ? User routes
 */
userRouter.post("/transaction/add/:id");
userRouter.get("/update/details/:id", );
userRouter.get("/investment/list/:id");
userRouter.get("/account/:id");
userRouter.get("/plan/create/:id");
userRouter.get("/balancelog/create/:id");
userRouter.get("/totalpaid/create/:id");
userRouter.get("/availablecredit/create/:id");
userRouter.get("/editPlan/:id/:incrementId");
userRouter.get("/edittotalpaid/:totalpaidId");
userRouter.get("/updatePlan/:id");
userRouter.get("/investment/list/:id");
userRouter.get("/edittotalpaid/:totalpaidId");
userRouter.get("/edittotalpaid/:totalpaidId");
userRouter.get("/editbalancelog/:balanceId");
userRouter.get("/editavailablecredit/:creditId");

userRouter.use("/verified", verifiedUserRoutes);
userRouter.use("/data", dataRoutes);

/**
 *  ? User routes
 */
usersRouter.post("/delete", DeleteUser);
usersRouter.get("/", getAll);
usersRouter.get("/search", search);
usersRouter.get("/discard", discardUser);
usersRouter.get("/verified", verifiedUserRoutes);

export { userRouter, usersRouter };
