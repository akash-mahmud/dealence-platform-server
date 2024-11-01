import { Request, Response } from "express";
import {
  Account,
  AvailableCredit,
  BalanceUpdateLog,
  Earned,
  Increment,
  Investment,
  Payout,
  TotalPaid,
  Transaction,
  User,
} from "../../models";
import moment from "moment";

export const getPagination = (page: any, size: any) => {
  const limit = size ? +size : 10;
  const offset = page ?? 1 ? (page - 1) * limit : 0;

  return { limit, offset };
};
export const getPagingData = (data: any, page: any, limit: any) => {
  const { count: totalItems, rows: users } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, users, totalPages, currentPage };
};
// plans
export const getPagingDataResponse = (data: any, page: any, limit: any) => {
  const { count: totalItems, rows: increment } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, increment, totalPages, currentPage };
};

const userController = {
  addUserTransaction: async (req: Request, res: Response) => {
    // const user = await User.findAll({
    //   where: { id: req.params.id },
    // });
    const { startDate, amount } = req.body;

    await Transaction.create({
      userId: req.params.id,
      date: new Date(startDate),
      type: "DEPOSIT",
      amount: amount,
    });

    await Account.increment("balance", {
      by: parseFloat(amount),
      where: { userId: req.params.id },
    });
     res.send("success");
  },

  updateUserDetails: async (req: Request, res: Response) => {
    const user = await User.findAll({
      where: { id: req.params.id },
    });
    const {
      first_name,
      last_name,
      email,
      phone_number,
      address,
      city,
      state,
      zip,
      country,
      contracts,
      status,
    } = req.body;

    if (user) {
      await User.update(
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone_number: phone_number,
          address: address,
          state: state,
          city: city,
          zip: zip,
          country: country,
          contracts,
          status,
        },
        { where: { id: req.params.id } }
      );

      res.send("success");
      return;
    }

    res.status(402).send("failed");
  },
  getUserInvestments: async (req: Request, res: Response) => {
    const user = await User.findAll({
      where: { id: req.params.id },
    });

    var investment = await Investment.findOne({
      where: { userId: req.params.id },
    });

    const increments = await Increment.findAll({
      order: [["createdAt", "ASC"]],
      where: { userId: req.params.id },
    });

    if (increments.length > 0) {
      const principal = increments
        .reduce(
          (prev: any, curr: { principal: any }) => prev + curr.principal,
          0.0
        )
        .toFixed(2);

       res.status(202).send({
        createdAt: investment.createdAt,
        id: investment.id,
        reinvestIncome: investment.reinvestIncome,
        tacitRenewal: investment.tacitRenewal,
        updatedAt: investment.updatedAt,
        userId: investment.userId,
        principal: principal,
        plan: increments[0].plan,
      });
      return
    } else {
       res.status(202).send("");
    }
    // return res.send('success');
  },

  getUserAccountDetails: async (req: Request, res: Response) => {
    var account = await Account.findOne({
      where: {
        userId: req.params.id,
      },
    });
    const payouts = await Payout.findAll({
      where: { userId: req.params.id },
    });
    const interestEarned = payouts
      .reduce((prev: any, curr: { amount: any }) => prev + curr.amount, 0.0)
      .toFixed(2);

    res.send({
      balance: account.balance,
      credit: account.availableCredit,
      interestEarned: interestEarned,
    });
  },
  createUserPlan: async (req: Request, res: Response) => {
    let { startDate, amount } = req.body;
    amount = parseInt(amount);
    var account = await Account.findOne({
      where: {
        userId: req.params.id,
      },
    });

    var investments = await Investment.findAll({
      where: { userId: req.params.id },
    });

    if (investments.length > 0) {
      res.send("Investment already present. Please update instead");
    } else {
      // const validBody = schema.validate(req.body);
      const validBody = { error: null };
      if (validBody.error == null) {
        // Create investment object
        const initialInvestment = await Investment.create({
          userId: req.params.id,
          reinvestIncome: req.body.reinvestIncome,
          createdAt: new Date(startDate),
          updatedAt: new Date(startDate),
        });
        await Earned.create({
          plan: req.body.plan,
          principal: parseFloat(req.body.amount),
          startDate: new Date(startDate),
          userId: req.params.id,
          investmentId: initialInvestment.id,
          createdAt: new Date(startDate),
          updatedAt: new Date(startDate),
        });
        // Create initial increment
        await Increment.create({
          plan: req.body.plan,
          principal: parseFloat(req.body.amount),
          startDate: new Date(startDate),
          createdAt: new Date(startDate),
          updatedAt: new Date(startDate),
          userId: req.params.id,
          investmentId: initialInvestment.id,
          contract: req.body.contract,
        });

        res.send("success");
      } else {
        res.send("Bad request");
      }
    }
  },

  createBalanceLog: async (req: Request, res: Response) => {
    let { startDate, balance, contract } = req.body;

    balance = parseInt(balance);

    try {
      // const validBody = balanceLogSchema.validate(req.body);
      const validBody = { error: null };
      if (validBody.error == null) {
        await BalanceUpdateLog.create({
          balance: balance,
          date: new Date(startDate),
          contract: contract,
          createdAt: new Date(startDate),
          updatedAt: new Date(startDate),
          userId: req.params.id,
        });

        res.send("success");
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  createTotalPaid: async (req: Request, res: Response) => {
    let { startDate, totalPaid, contract } = req.body;
    totalPaid = parseFloat(req.body.totalPaid);

    try {
      // const validBody = totalPaidSchema.validate(req.body);
      const validBody = { error: null };

      if (validBody.error == null) {
        await TotalPaid.create({
          totalPaid: totalPaid,
          date: new Date(startDate),
          contract: contract,
          createdAt: new Date(startDate),
          updatedAt: new Date(startDate),
          userId: req.params.id,
        });

        res.send("success");
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  createAvailableCredit: async (req: Request, res: Response) => {
    let { startDate, credit, contract } = req.body;
    const { id } = req.params;
    credit = parseFloat(req.body.credit);

    try {
      // const validBody = availableCreditSchema.validate(req.body);
      const validBody = { error: null };

      console.log(validBody);
      if (validBody.error == null) {
        await AvailableCredit.create({
          credit: credit,
          contract: contract,
          createdAt: new Date(startDate),
          updatedAt: new Date(startDate),
          userId: id,
        });

        res.send("success");
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  withdrawPayout: async (req: Request, res: Response) => {
    let { startDate, amount } = req.body;
    amount = parseInt(amount);

    var account = await Account.findOne({
      where: {
        userId: req.params.id,
      },
    });
    if (amount <= account.availableCredit) {
      await Transaction.create({
        userId: req.params.id,
        date: new Date(startDate),
        createdAt: new Date(startDate),
        updatedAt: new Date(startDate),
        type: "WITHDRAWAL",
        amount: amount,
        iban: "Added by admin",
      });

      await Account.decrement("availableCredit", {
        by: amount,
        where: { userId: req.params.id },
      });

       res.status(201).send("success");
       return
    } else {
      res.send("Not enough balance");
    }
  },

  withdrawBalance: async (req: Request, res: Response) => {
    let { amount } = req.body;
    amount = parseInt(amount);

    var account = await Account.findOne({
      where: {
        userId: req.params.id,
      },
    });
    if (amount <= account.balance) {
      await Account.decrement("balance", {
        by: amount,
        where: { userId: req.params.id },
      });

      res.status(201).send("success");
      return
    } else {
      res.send("Not enough balance");
    }
  },
  decreaseBalance: async (req: Request, res: Response) => {
    let { amount } = req.body;
    amount = parseInt(amount);

    var account = await Account.findOne({
      where: {
        userId: req.params.id,
      },
    });
    if (amount <= account.balance) {
      await Account.decrement("balance", {
        by: amount,
        where: { userId: req.params.id },
      });

      res.status(201).send("success");
      return
    } else {
      res.send("Your entered amount is bigger than his balance");
    }
  },
  decreasePayout: async (req: Request, res: Response) => {
    let { amount } = req.body;
    amount = parseInt(amount);

    var account = await Account.findOne({
      where: {
        userId: req.params.id,
      },
    });
    if (amount <= account.availableCredit) {
      await Account.decrement("availableCredit", {
        by: amount,
        where: { userId: req.params.id },
      });

      res.status(201).send("success");
      return 
    } else {
      res.send("Your entered amount is bigger than his total payout");
    }
  },

  addDirectPayout: async (req: Request, res: Response) => {
    let { amount } = req.body;
    amount = parseFloat(amount);

    var account = await Account.findOne({
      where: {
        userId: req.params.id,
      },
    });
    // if (amount <= account.balance) {
    //   await Account.decrement('balance', {
    //     by: amount,
    //     where: { userId: req.params.id },
    //   });

    //   return res.status(201).send('success');
    // } else {
    account.availableCredit += amount;

    await account.save();
    res.status(201).send("success");
    return
    // }
  },
  updateIncrement: async (req: Request, res: Response) => {
    console.log(req.body);
    let { startDate, amount, contract, plan } = req.body;
    const { id, incrementId } = req.params;
    amount = parseInt(amount);

    var investments = await Investment.findAll({
      where: { userId: id },
    });

    if (investments.length > 0) {
      // const validBody = schema.validate(req.body);
      const validBody = { error: null };
      if (validBody.error == null) {
        // Update investment object
        const initialInvestment = await Investment.findOne({
          userId: id,
        });

        await initialInvestment.update({
          updatedAt: new Date(startDate),
        });
        const increment = await Increment.findOne({
          where: {
            id: incrementId,
          },
        });
        // await earned.update({
        //   plan: plan,
        //   principal: amount,
        //   startDate: new Date(startDate),
        //   investmentId: initialInvestment.id,
        //   createdAt: new Date(startDate),
        //   updatedAt: new Date(startDate),
        // });
        // Update initial increment
        await increment.update({
          plan: plan,
          principal: amount,
          startDate: new Date(startDate),

          contract: contract,
        });

        res.send("success");
      } else {
        res.send("Bad request");
      }
    }
  },
  updateTotalpaidId: async (req: Request, res: Response) => {
    let { startDate, totalPaid } = req.body;
    const { totalpaidId } = req.params;
    totalPaid = parseFloat(totalPaid);

    try {
      // const validBody = totalPaidSchema.validate(req.body);
      const validBody = { error: null };

      if (validBody.error == null) {
        // Update balancelog object
        const totalpaid = await TotalPaid.findOne({
          where: {
            id: totalpaidId,
          },
        });
        await totalpaid.update({
          totalPaid: totalPaid,
          date: new Date(startDate),
        });

        res.send("success");
      }
    } catch (err: any) {
      res.send(err.message);
    }
  },

  updateBlancelog: async (req: Request, res: Response) => {
    let { startDate, balance } = req.body;
    const { balanceId } = req.params;
    balance = parseInt(balance);

    try {
      // const validBody = balanceLogSchema.validate(req.body);
      const validBody = { error: null };

      if (validBody.error == null) {
        // Update balancelog object
        await BalanceUpdateLog.update(
          {
            balance: balance,
            date: new Date(startDate),
          },
          {
            where: {
              id: balanceId,
            },
          }
        );

        res.send("success");
      }
    } catch (err: any) {
      console.log(err);
      res.send(err.message);
    }
  },

  updateAvailableCredit: async (req: Request, res: Response) => {
    let { startDate, credit } = req.body;
    const { creditId } = req.params;
    credit = parseFloat(credit);

    try {
      // const validBody = availableCreditSchema.validate(req.body);
      const validBody = { error: null };

      if (validBody.error == null) {
        // Update available credit object
        await AvailableCredit.update(
          {
            credit: credit,
          },
          {
            where: {
              id: creditId,
            },
          }
        );

        res.send("success");
      }
    } catch (err: any) {
      res.send(err.message);
    }
  },
  updateplan: async (req: Request, res: Response) => {
    let { startDate, amount } = req.body;
    amount = parseInt(amount);
    var account = await Account.findOne({
      where: {
        userId: req.params.id,
      },
    });

    // const validBody = schema.validate(req.body);
    const validBody = { error: null };

    if (validBody.error == null) {
      var investment = await Investment.findOne({
        where: { userId: req.params.id },
      });

      if (investment == null) {
        res.status(400).send({
          message: "User has no investment yet. Please create one first",
        });

        return;
      }
      await Earned.create({
        plan: req.body.plan,
        principal: parseFloat(req.body.amount),
        startDate: new Date(startDate),

        userId: req.params.id,
        investmentId: investment.id,
      });

      const daysElapsed = moment(new Date()).diff(investment.createdAt, "days");
      const increments = await Increment.findAll({
        order: [["createdAt", "ASC"]],
        where: { userId: req.params.id },
      });

      if (increments.length == 1 && daysElapsed <= 15) {
        // If the user has only made a single investment
        // and less than 15 days have passed update the
        // first increment's principal, plan and start
        // date
        const firstIncrement = increments[0];

        await firstIncrement.update({
          plan: req.body.plan,
          principal: firstIncrement.principal + parseFloat(req.body.amount),
          startDate: new Date(startDate),
          createdAt: new Date(startDate),
          contract: req.body.contract,
        });
      } else {
        // If more than 15 days have elapsed or the user
        // has more than a single increment create a new
        // increment with the invested amount as the principal
        await Increment.create({
          plan: req.body.plan,
          principal: parseFloat(req.body.amount),
          startDate: new Date(startDate),

          userId: req.params.id,
          investmentId: investment.id,
          contract: req.body.contract,
        });
      }

      await Account.decrement("balance", {
        by: req.body.amount,
        where: { userId: req.params.id },
      });

      res.send({
        message: "success",
      });
    } else {
      res.status(400).send({
        message: "invalid payload",
      });
    }
  },
  getInvestment: async (req: Request, res: Response) => {
    console.log("hi");
    const investment = await Investment.findOne({
      where: { userId: req.params.id },
    });
    res.send(investment);
  },
};

export { userController };
