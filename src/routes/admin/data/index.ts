import express from 'express'

const dataRoutes = express.Router();

dataRoutes.get("/withdraw/payOut/:id")
dataRoutes.get("/withdraw/balance/:id")
dataRoutes.get("/decrease/balance/data/:id")
dataRoutes.get("/decrease/payout/data/:id")
dataRoutes.get("/withdraw/balance/:id")
dataRoutes.get("/add/payout/direct/:id")

export {
    dataRoutes
}