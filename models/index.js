const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host:   process.env.POSTGRES_HOST,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models

db.formula = require("./formula.model")(sequelize, Sequelize);

module.exports = db;