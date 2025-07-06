'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');
// const { Expense } = require('./Expense.model.js');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// User.hasMany(Expense);

module.exports = {
  User,
};
