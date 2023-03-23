const { BalanceUpdateLog } = require("../models");

// define CRUD API controllers for BalanceUpdateLog model
const BalanceUpdateLogController = {
  getAll: async (req, res) => {
    const balanceUpdateLogs = await BalanceUpdateLog.findAll();
    res.json(balanceUpdateLogs);
  },

  getById: async (req, res) => {
    const { id } = req.params;
      const balanceUpdateLog = await BalanceUpdateLog.findOne({
        where: { id:id },
      });
    res.json(balanceUpdateLog);
  },

  create: async (req, res) => {
    const { balance, date, contract, userId } = req.body;
    const balanceUpdateLog = await BalanceUpdateLog.create({
      balance,
      date,
      contract,
      userId: userId,
    });
    res.json(balanceUpdateLog);
  },

  updateById: async (req, res) => {
    const { id } = req.params;
    const { balance, date, contract, userId } = req.body;
    const balanceUpdateLog = await BalanceUpdateLog.findOne({
      where: { id: id },
    });
    await balanceUpdateLog.update({
      balance,
      date,
      contract,
      userId,
    });
    res.json(balanceUpdateLog);
  },

  deleteById: async (req, res) => {
    const { id } = req.params;
    await BalanceUpdateLog.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  },
};
module.exports = {
  BalanceUpdateLogController,
};
