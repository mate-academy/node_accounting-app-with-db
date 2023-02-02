'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db.js').sequelize;

const Expense = sequelize.define(
  'Expense',
  {
    userId: {
      type: DataTypes.INTEGER,
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'spentAt',
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'expenses',
    updatedAt: false,
  }
);

module.exports = { Expense };
