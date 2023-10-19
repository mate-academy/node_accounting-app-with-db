'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('./DBConnection');

const Expenses = sequelize.define('expenses', {
  id: {
    type: DataTypes.TEXT,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  createdAt: false,
  updatedAt: false,
});

Expenses.sync();

module.exports = {
  Expenses,
};
