import { Request, Response } from "express";
import { BuisnessSection } from "../models";

export const getAllWithoutFile = async function (req: Request, res: Response) {
  const buisnessSections = await BuisnessSection.findAll({
    attributes: { exclude: ["relevantDocuments"] },
  });

  res.send(buisnessSections);
};

export const getAll = async function (req: Request, res: Response) {
  const buisnessSections = await BuisnessSection.findAll({});

  res.send(buisnessSections);
};

export const findOneWithFiles = async function (req: Request, res: Response) {
  const buisnessSection = await BuisnessSection.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["relevantDocuments"] },
  });
  res.send(buisnessSection);
};
export const findOne = async function (req: Request, res: Response) {
  const buisnessSection = await BuisnessSection.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["relevantDocuments"] },
  });

  res.send(buisnessSection);
};
export const createOne = async function (req: Request, res: Response) {
  try {
    const buisnessSections = await BuisnessSection.create({ ...req.body });

    res.send(buisnessSections);
  } catch (error) {
    console.log(error);
  }
};
export const updateOne = async function (req: Request, res: Response) {
  const buisnessSections = await BuisnessSection.findOne({
    where: { id: req.params.id },
  });
  await buisnessSections?.update(req.body);
  res.send(buisnessSections);
};

export const deleteOne = async function (req: Request, res: Response) {
  await BuisnessSection.destroy({
    where: { id: req.params.id },
  });

  res.sendStatus(204);
};
