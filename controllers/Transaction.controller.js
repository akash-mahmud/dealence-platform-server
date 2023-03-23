const transactionsType = require("../constants/transactionsType");

const { Transaction } = require("../models");
const { Account } = require("../models");
const Mailer = require("../utils/mailer");







exports.list = async function (req, res) {
  const transactions = await Transaction.findAll({
    where: {
      userId: req.user.id,
    },
  });
  res.send(transactions);
};

exports.deposit = async function (req, res) {
  try {
     const mailer = new Mailer();

     const depositInfoEmailToAdmin = await mailer.getDepositInfoMailToAdmin(
       req.user,
    req.body.amount
     );

    await mailer.sendMailSync(depositInfoEmailToAdmin);
    return res.status(201).send('success')
} catch (error) {
   return res.status(500).send(error.message);
}
};





exports.withdraw = async function (req, res) {
  try {
    const withdrawAmount = parseFloat(req.body.withdrawAmount);

    var account = await Account.findOne({
      where: {
        userId: req.user.id,
      },
    });
    if (withdrawAmount <= account.availableCredit) {

      const mailer = new Mailer();
      let depositInfoEmail = await mailer.getWithdrawInfoMail(
        req.user,
        req.body.withdrawNameFull,
        req.body.bankName,
        req.body.swift,
        req.body.withdrawEmail,

        withdrawAmount,
        req.body.iban
      );

      let depositInfoEmailAdmin = await mailer.getWithdrawInfoMailAdmin(
        req.user,
        req.body.withdrawNameFull,
        req.body.bankName,
        req.body.swift,
        req.body.withdrawEmail,

        withdrawAmount,
        req.body.iban
      );

      await mailer.sendMailSync(depositInfoEmail);

      await mailer.sendMailSync(depositInfoEmailAdmin);

      return res.status(201).send("success");
    } else {
      res.send("Not enough balance");
    }
  } catch (error) {}
};


