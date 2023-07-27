'use strict';

const { sequelize } = require('../utils/db');
const { DataTypes } = require('sequelize');
const User = require('./user');

const Expense = sequelize.define('expense', {
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  note: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Expense.belongsTo(User);
User.hasMany(Expense);

module.exports = Expense;
