import express from "express";

const verifiedUserRoutes = express.Router()

verifiedUserRoutes.get("/plans/:id")
verifiedUserRoutes.get("/plan/:id/:increamentId")
verifiedUserRoutes.get("/planbalance/:balanceId")
verifiedUserRoutes.get("/availablecredit/:creditId")
verifiedUserRoutes.get("/balancelogs/:id")
verifiedUserRoutes.get("/totalpaids/:id")
verifiedUserRoutes.get("/availablecredits/:id")
verifiedUserRoutes.get("/plan/delete/:id")
verifiedUserRoutes.get("/balancelog/delete/:id")
verifiedUserRoutes.get("totalpaid/delete/:id")
verifiedUserRoutes.get("/availablecredit/delete/:id")
verifiedUserRoutes.get("/availablecredit/delete/:id")
verifiedUserRoutes.get("/availablecredit/delete/:id")
verifiedUserRoutes.get("/availablecredit/delete/:id")

export {
    verifiedUserRoutes 
}