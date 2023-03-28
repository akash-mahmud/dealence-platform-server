// define CRUD API controllers for TotalPaid model
const { Op } = require("sequelize");
const { TotalPaid, sequelize } = require("../models");
const TotalPaidController = {
  getAll: async (req, res) => {

    try {
        const getMonthlyBalance = async (year, month, userId, contract) => {
          try {
          } catch (error) {}
          const startDate = new Date(year, 0, 1);
          const endDate = new Date(year, 11, 31);

          const result = await TotalPaid.findAll({
            attributes: [
              [
                sequelize.fn("DATE_TRUNC", "month", sequelize.col("date")),
                "month",
              ],
              [sequelize.fn("SUM", sequelize.col("totalPaid")), "totalPaid"],
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
          req.body.contract
        );

      return  res.send(data);
    } catch (error) {
      return res.json({
        message:error.message
      }); 
    }
  
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
