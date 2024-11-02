import express from "express";
import { verifiedController } from "../../../controllers/admin/user.verified.controller";
const {
  getAllVerifiedUsers,
  getUserPlanBalanceDetails,
  getUserPlanIncrementDetails,
  getUserBalanceLogs,
  getUserAvailableCreditDetails,
  getUserTotalPaidDetails,
  getUserAvilablecredits,
  getUserPlansDetails,
  deleteAvailablecredit,
  deleteUserBalanceLog,
  deleteUserTotalPaid,
  deleteUsersPlan,getVerifiedUser,
  getUserTotalpaids
} = verifiedController;
const verifiedUserRoutes = express.Router();

verifiedUserRoutes.get("/", getAllVerifiedUsers);
verifiedUserRoutes.get("/plans/:id", getUserPlansDetails);
verifiedUserRoutes.get("/plan/balance/:balanceId", getUserPlanBalanceDetails);
verifiedUserRoutes.get("/plan/:id/:increamentId", getUserPlanIncrementDetails);
verifiedUserRoutes.get("/:id", getVerifiedUser);
verifiedUserRoutes.get(
  "/availablecredit/:creditId",
  getUserAvailableCreditDetails
);
verifiedUserRoutes.get("/balancelogs/:id", getUserBalanceLogs);
verifiedUserRoutes.get("/totalpaids/:id", getUserTotalpaids);
verifiedUserRoutes.get("/totalpaid/:totalpaidId", getUserTotalPaidDetails);
verifiedUserRoutes.get("/availablecredits/:id", getUserAvilablecredits);
verifiedUserRoutes.delete("/plan/delete/:id", deleteUsersPlan);
verifiedUserRoutes.delete("/balancelog/delete/:id", deleteUserBalanceLog);
verifiedUserRoutes.delete("/totalpaid/delete/:id", deleteUserTotalPaid);
verifiedUserRoutes.delete("/availablecredit/delete/:id", deleteAvailablecredit);

export { verifiedUserRoutes };
