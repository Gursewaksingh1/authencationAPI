const sequelize = require("sequelize");

const db = require("../db");

const user = db.define("User", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      len: [5, 20],
    },
  },

  address: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      len: [8, 50],
    },
  },
  image: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

module.exports = user;
