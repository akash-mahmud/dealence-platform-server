import express from "express";
import { dataRoutes } from "./data";
import { verifiedUserRoutes } from "./verified";
import { usersController } from "../../controllers/admin/users";
import { userController } from "../../controllers/admin/user.controller";
const {
  delete: DeleteUser,
  getAll,
  search,
  discardUser,
  approve,
} = usersController;
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
  createAvailableCredit,
  createBalanceLog,
  createTotalPaid,
  createUserPlan,
} = userController;

const userRouter = express.Router();
const usersRouter = express.Router();
/**
 *  ? User routes
 */
userRouter.post("/transaction/add/:id" , addUserTransaction);
userRouter.post("/update/details/:id", updateUserDetails);
userRouter.get("/investment/list/:id" , getUserInvestments);
userRouter.post("/investment/list/:id" , getInvestment);
userRouter.get("/account/:id", getUserAccountDetails);
userRouter.post("/plan/create/:id", createUserPlan);
userRouter.post("/balancelog/create/:id" , createBalanceLog);
userRouter.post("/totalpaid/create/:id" , createTotalPaid);
userRouter.post("/availablecredit/create/:id", createAvailableCredit);
userRouter.post("/editPlan/:id/:incrementId", updateIncrement);
userRouter.post("/edittotalpaid/:totalpaidId" , updateTotalpaidId);
userRouter.post("/updatePlan/:id" , updateplan);


userRouter.post("/editbalancelog/:balanceId" , updateBlancelog);
userRouter.post("/editavailablecredit/:creditId" , updateAvailableCredit);

userRouter.use("/data", dataRoutes);

/**
 *  ? User routes
 */
usersRouter.post("/delete", DeleteUser);
usersRouter.get("/", getAll);
usersRouter.post("/", approve);
usersRouter.get("/search", search);
usersRouter.post("/discard", discardUser);
usersRouter.use("/verified", verifiedUserRoutes);

export { userRouter, usersRouter };
