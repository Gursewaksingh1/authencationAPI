const sequelize = require("sequelize");

const db = new sequelize("user", "root", null, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = db