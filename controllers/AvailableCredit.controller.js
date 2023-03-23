

const {AvailableCredit} = require("../models");




// define CRUD API controllers for AvailableCredit model
const AvailableCreditController = {
  getAll: async (req, res) => {
    const availableCredits = await AvailableCredit.findAll();
    res.json(availableCredits);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const availableCredit = await AvailableCredit.findOne({
        where: { id:id },
      });
    res.json(availableCredit);
  },

  create: async (req, res) => {
    const { credit, contract, userId } = req.body;
    const availableCredit = await AvailableCredit.create({
      credit,
      contract,
      userId,
    });
    res.json(availableCredit);
  },

  updateById: async (req, res) => {
    const { id } = req.params;
    const { credit, contract, userId } = req.body;
    const availableCredit = await AvailableCredit.findOne({
        where: { id:id },
      });
    await availableCredit.update({
      credit,
      contract,
      userId,
    });
    res.json(availableCredit);
  },

  deleteById: async (req, res) => {
    const { id } = req.params;
    await AvailableCredit.destroy({
      where: {
        id
      }
    });
    res.sendStatus(204);
  }
};







module.exports = {
  AvailableCreditController,

};

