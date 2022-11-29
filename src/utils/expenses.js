'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const { User } = require('./users');

const Expense = sequelize.define('Expense', {
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.REAL,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Expenses',
});

Expense.belongsTo(User);

Expense.sync();

module.exports = { Expense };
