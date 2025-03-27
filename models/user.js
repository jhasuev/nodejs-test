 
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  balance: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10000 },
});

module.exports = User;
