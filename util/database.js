const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "myvote-lab5",
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: 21014,
  }
);

module.exports = sequelize;
