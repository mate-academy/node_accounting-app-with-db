'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    spentAt: { type: DataTypes.DATE, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    category: { type: DataTypes.STRING },
    note: { type: DataTypes.TEXT },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: 'expenses',
    timestamps: false,
  },
);

module.exports = {
  Expense,
};
