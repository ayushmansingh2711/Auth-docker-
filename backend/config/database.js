const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DB,       // Database name
  process.env.MYSQL_USER,     // MySQL username
  process.env.MYSQL_PASSWORD, // MySQL password
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    logging: false
  }
);

module.exports = sequelize;
