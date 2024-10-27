const { Sequelize, Op } = require("sequelize");
const { BalanceUpdateLog, sequelize } = require("../models");

// define CRUD API controllers for BalanceUpdateLog model
const BalanceUpdateLogController = {
  getAllChart: async (req, res) => {

    try {
      const getMonthlyBalance = async (year, month, userId, contract) => {
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);
        console.log("startDate:", startDate);
        console.log("endDate:", endDate);

        const result = await BalanceUpdateLog.findAll({
          attributes: [
            [
              sequelize.fn("DATE_TRUNC", "month", sequelize.col("date")),
              "month",
            ],
            [sequelize.fn("SUM", sequelize.col("balance")), "investment"],
          ],
          where: {
            userId,
            contract,
            date: {
              [Op.between]: [startDate, endDate],
            },
          },
          raw: true,
          group: sequelize.literal(`DATE_TRUNC('month', "date")`),
        });

        return result;
      };

      const data = await getMonthlyBalance(
        new Date(req.body.year).getFullYear(),

        1,
        req?.user?.id,
        req.body.contract !==''
          ? req.body.contract
          : req?.user?.contracts?.split(",")[0]
      );

      return res.send(data);
    } catch (error) {
      return res.json({
              message:error.message
            });
    }

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
