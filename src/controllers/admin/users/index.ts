import { Request, Response } from "express";
import { User } from "../../../models";
import { Mailer } from "../../../utils/mailer";

const usersController = {
  delete: async (req: Request, res: Response) => {
    const { id } = req.body;
    await User.destroy({
      where: {
        id,
      },
    });
    res.send("success");
  },

  getAll: async (req: Request, res: Response) => {
    const users = await User.findAll({
      where: { isActive: false, isDocumentUploaded: true },
    });
    res.send(users);
  },

  search: async (req: Request, res: Response) => {
    const user = await User.findAll({
      where: { email: req.body.searchEmail },
    });
    res.send(user);
  },

  userDocumentUpdate: async (req: Request, res: Response) => {
    const user = await User.findOne({ where: { id: req.body.id } });

    if (!user) {
      res.send("User does not exists");
    }
    if (user.dataValues.isDocumentUploaded === false) {
      res.status(403).send("User does not exists");
    }

    if (user) {
      await User.update(
        {
          isActive: true,
        },
        { where: { id: req.body.id } }
      );

      const mailer = new Mailer();
      let documentApprove = await mailer.getUpAprooveInfoMail(user);
      try {
        await mailer.sendMailSync(documentApprove);

        res.send({ message: "User updated successfully" });
      } catch (error) {
        const errorString = `Error sending email: ${error}`;

        res.status(500).send({ message: errorString });
      }
    }
  },

  discardUser: async (req: Request, res: Response) => {
    const user = await User.findOne({ where: { id: req.body.id } });
    const mailer = new Mailer();
    let documentDiscard = await mailer.getUpDAteInfoMail(user);
    try {
      await mailer.sendMailSync(documentDiscard);

      res.send({ message: "User update mail send" });
    } catch (error) {
      console.log(error);

      const errorString = `Error sending email: ${error}`;

      res.status(500).send({ message: errorString });
    }
  },
  approve: async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ where: { id: req.body.id } });

      if (!user) {
        res.status(404).send("User does not exists");
      }
      if (user.dataValues.isDocumentUploaded === false) {
        res.status(403).send("User does not exists");
      }

      if (user) {
        await User.update(
          {
            isActive: true,
          },
          { where: { id: req.body.id } }
        );

        const mailer = new Mailer();
        let documentApprove = await mailer.getUpAprooveInfoMail(user);
        try {
          await mailer.sendMailSync(documentApprove);

          res.send({ message: "User updated successfully" });
        } catch (error) {
          console.log(error);

          const errorString = `Error sending email: ${error}`;

          res.status(500).send({ message: errorString });
        }
      }
    } catch (error) {
      console.log(error);

      res.status(400).send("Something went wrong!");
    }
  },
};

export { usersController };
