import { DataTypes, Sequelize } from "sequelize";

const BuisnessSectionModel = (sequelize:Sequelize, Sequelize:any) => {
  const BuisnessSectionModel = sequelize.define("buisnessSectionModel", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    logo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    websiteUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    relevantDocuments: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
  });
  return BuisnessSectionModel;
};
export {
  BuisnessSectionModel
}

// 1730728423345-functions-and-graphs.pdf
// 1730733157637-functions_and_graphs_gelfand.pdf
// 1730733213101-pdfcoffee.com_liz-grammar-volume-2-pdf-pdf-free.pdf
// 1730733303894-IELTS_Band9_VocabSecrets.pdf


// 1730733477909-logo.png