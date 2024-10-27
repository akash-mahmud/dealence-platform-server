module.exports = (sequelize, Sequelize) => {
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
      type: Sequelize.STRING,
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
