'use strict';

const { sequelize } = require('../main');
const { DataTypes } = require('sequelize');

const Expenses = sequelize.define('Expense', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  note: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'expenses',
});

module.exports = { Expenses };
