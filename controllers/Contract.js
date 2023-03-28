const { Increment } = require("../models");
const { AvailableCredit } = require("../models");
exports.getBalanceByContract = async function (req, res) {
    try {
          const increment = await Increment.findOne({
            where: { userId: req.user.id, contract: req.body.contract },
          });

          res.send(increment);
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }

};

exports.getAvailableCreditByContract = async function (req, res) {
  const availableCredit = await AvailableCredit.findOne({
    where: { userId: req.user.id, contract: req.body.contract },
  });

  res.send(availableCredit);
};
