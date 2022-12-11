'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const { User } = require('./users');

const Expense = sequelize.define('Expense', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
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

Expense.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
});

Expense.sync();

module.exports = { Expense };
