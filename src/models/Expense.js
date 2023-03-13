'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const User = require('./User');

const Expense = sequelize.define('Expense', {
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
}, {
  tableName: 'expenses',
  createdAt: false,
  updatedAt: false,
});

Expense.belongsTo(User, { foreignKey: 'userId' });

module.exports = Expense;
