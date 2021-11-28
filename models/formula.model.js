module.exports = (sequelize, Sequelize) => {
  const Formula = sequelize.define("formula", {
    code: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    baseCode: {
      type: Sequelize.STRING,
    },
    baseType: {
      type: Sequelize.STRING,
    },
    base: {
      type: Sequelize.STRING,
    },
    yellow: {
      type: Sequelize.STRING,
    },
    red: {
      type: Sequelize.STRING,
    },
    black: {
      type: Sequelize.STRING,
    },
    white: {
      type: Sequelize.STRING,
    },
    green: {
      type: Sequelize.STRING,
    },
  });

  return Formula;
};
