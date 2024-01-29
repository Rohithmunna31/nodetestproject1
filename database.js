// db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "nodeproject1",
  "root",
  "Rohith@3112",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = { sequelize };
