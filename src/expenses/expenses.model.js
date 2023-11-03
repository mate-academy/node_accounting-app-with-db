'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Expenses = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    category: {
      type: DataTypes.STRING,
    },
    note: {
      type: DataTypes.STRING,
    },
  },
  {}
);

module.exports = Expenses;
