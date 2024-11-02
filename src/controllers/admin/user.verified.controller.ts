import { Request, Response } from "express";
import {
  AvailableCredit,
  BalanceUpdateLog,
  Increment,
  TotalPaid,
  User,
} from "../../models";
import {
  getPagination,
  getPagingData,
  getPagingDataResponse,
} from "./user.controller";

const verifiedController = {
  getAllVerifiedUsers: async (req: Request, res: Response) => {
    const condition = { isActive: true, isDocumentUploaded: true };
    const { page = 1, size = 20 } = req.query;
    const { limit, offset } = getPagination(page as number, size as number);

    const users = await User.findAndCountAll({
      where: condition,
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    const response = getPagingData(users, page, limit);
    res.send(response);
  },
  getVerifiedUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findAll({
        where: { id: req.params.id },
      });
      res.send(user);
    } catch (error) {
      // console.log(error);
      res.send([]);
    }
  },
  getVerifiedUserById: async (req: Request, res: Response) => {
    const user = await User.findAll({
      where: { id: req.params.id },
    });
    res.send(user);
  },

  getUserPlansDetails: async (req: Request, res: Response) => {
    try {
      console.log("hello hi bye");
      console.log(req.params.id);

      const condition = { userId: req.params.id };
      const { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);

      const plansData = await Increment.findAndCountAll({
        where: condition,
        order: [["createdAt", "ASC"]],
        limit,
        offset,
      });

      const response = getPagingDataResponse(plansData, page, limit);

      res.send(response);
    } catch (error) {
      console.log(error);

      res.send(401).send({});
    }
  },

  getUserPlanIncrementDetails: async (req: Request, res: Response) => {
    const condition = { userId: req.params.id, id: req.params.increamentId };

    const planData = await Increment.findOne({
      where: condition,
    });

    res.send(planData);
  },
  getUserPlanBalanceDetails: async (req: Request, res: Response) => {
    const planBalanceData = await BalanceUpdateLog.findOne({
      where: {
        id: req.params.balanceId,
      },
    });

    res.send(planBalanceData);
  },

  getUserTotalPaidDetails: async (req: Request, res: Response) => {
    try {
      const totalpaidData = await TotalPaid.findOne({
        where: {
          id: req.params.totalpaidId,
        },
      });

      res.send(totalpaidData);
    } catch (error) {
      res.status(402).send();
    }
  },
  getUserAvailableCreditDetails: async (req: Request, res: Response) => {
    const availablecreditData = await AvailableCredit.findOne({
      where: {
        id: req.params.creditId,
      },
    });

    res.send(availablecreditData);
  },
  getUserBalanceLogs: async (req: Request, res: Response) => {
    const condition = { userId: req.params.id };
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const plansData = await BalanceUpdateLog.findAndCountAll({
      where: condition,
      order: [["createdAt", "ASC"]],
      limit,
      offset,
    });

    const response = getPagingDataResponse(
      plansData,
      page,
      limit,
      "balanceLogs"
    );

    res.send(response);
  },

  getUserTotalpaids: async (req: Request, res: Response) => {
    const condition = { userId: req.params.id };
    const { page, size } = req.query;
    // @ts-ignore
    const { limit, offset } = getPagingData(page, size);

    const plansData = await TotalPaid.findAndCountAll({
      where: condition,
      order: [["createdAt", "ASC"]],
      limit,
      offset,
    });

    const response = getPagingDataResponse(
      plansData,
      page,
      limit,
      "totalPaids"
    );

    res.send(response);
  },

  getUserAvilablecredits: async (req: Request, res: Response) => {
    const { id, contract } = req.params;
    const { page, size } = req.query;
    // @ts-ignore

    const { limit, offset } = getPagingData(page, size);

    const plansData = await AvailableCredit.findAndCountAll({
      where: { userId: id },
      order: [["createdAt", "ASC"]],
      limit,
      offset,
    });

    const response = getPagingDataResponse(
      plansData,
      page,
      limit,
      "availablecredits"
    );

    res.send(response);
  },

  deleteUsersPlan: async (req: Request, res: Response) => {
    const condition = { id: req.params.id };
    const data = await Increment.findAll({
      where: condition,
    });
    console.log(data);

    const deleted = await Increment.destroy({
      where: condition,
    });

    res.status(201).send("success");
  },

  deleteUserBalanceLog: async (req: Request, res: Response) => {
    await BalanceUpdateLog.destroy({
      where: { id: req.params.id },
    });

    res.status(201).send("success");
  },

  deleteUserTotalPaid: async (req: Request, res: Response) => {
    await TotalPaid.destroy({
      where: { id: req.params.id },
    });

    res.status(201).send("success");
  },

  deleteAvailablecredit: async (req: Request, res: Response) => {
    try {
      const database = await AvailableCredit.destroy({
        where: { id: req.params.id },
      });

      res.status(200).send("success");
    } catch (error) {
      console.log(error);

      res.status(405).send("Something went wrong!");
    }
  },
};

export { verifiedController };
