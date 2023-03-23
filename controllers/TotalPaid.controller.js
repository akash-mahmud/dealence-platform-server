// define CRUD API controllers for TotalPaid model
const { TotalPaid } = require("../models");
const TotalPaidController = {
  getAll: async (req, res) => {
    const totalPaids = await TotalPaid.findAll();
    res.json(totalPaids);
  },



    
  getById: async (req, res) => {
    const { id } = req.params;
    const totalPaid = await TotalPaid.findOne({
        where: { id:id },
      });
    res.json(totalPaid);
  },

  create: async (req, res) => {
    const { totalPaid, date, contract ,userId} = req.body;
    const totalPaidcreated = await TotalPaid.create({
totalPaid, date, contract ,userId
    });
    res.json(totalPaidcreated);
  },

  updateById: async (req, res) => {
    const { id } = req.params;
    const { totalPaid, date, contract, userId } = req.body;
    const totalPaidUpdated = await TotalPaid.findOne({
      where: { id: id },
    });
    await totalPaidUpdated.update({
      totalPaid,
      date,
      contract,
      userId,
    });
    res.json(totalPaidUpdated);
  },

  deleteById: async (req, res) => {
    const { id } = req.params;
    await TotalPaid.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  },
};
module.exports = {
  TotalPaidController,
};
