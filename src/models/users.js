const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db.js");

const Users = sequelize.define('Users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  tableName: 'users',
});

module.exports = Users;
