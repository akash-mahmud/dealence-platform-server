const { BuisnessSection } = require("../models");

exports.getAllWithoutFile = async function (req, res) {
  const buisnessSections = await BuisnessSection.findAll({
    attributes: { exclude: ["relevantDocuments"] },
  });

  res.send(buisnessSections);
};

exports.getAll = async function (req, res) {
  const buisnessSections = await BuisnessSection.findAll({});

  res.send(buisnessSections);
};
