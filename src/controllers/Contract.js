const { Increment } = require("../models");
const { AvailableCredit } = require("../models");
exports.getBalanceByContract = async function (req, res) {
  try {
    if (req.user.id && req.body.contract) {
                  const increment = await Increment.findOne({
                    where: { userId: req.user.id, contract: req.body.contract },
                  });

               return   res.send(increment);
      }
return res.send([])
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }

};

exports.getAvailableCreditByContract = async function (req, res) {
  try {
      if (req.user.id && req.body.contract) {
        const availableCredit = await AvailableCredit.findOne({
          where: { userId: req.user.id, contract: req.body.contract },
        });
        return res.send(availableCredit);
      }
      return res.send([]);
  } catch (error) {
            res.status(404).json({
              message: error.message,
            });
  }



};
