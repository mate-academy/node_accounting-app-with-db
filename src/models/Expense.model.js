'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'Expense',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    spentAt: { type: DataTypes.DATE, allowNull: false },
    title: { type: DataTypes.TEXT, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    category: { type: DataTypes.TEXT, allowNull: true, defaultValue: '-' },
    note: { type: DataTypes.TEXT, allowNull: true, defaultValue: '-' },
  },
  { tableName: 'expenses', updatedAt: false, createdAt: false },
);

module.exports = {
  Expense,
};
