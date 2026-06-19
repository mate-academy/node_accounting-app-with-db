'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Expense = sequelize.define(
  'Expense',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    spentAt: { type: DataTypes.DATE, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    note: { type: DataTypes.TEXT, defaultValue: '' },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: 'expenses', timestamps: false },
);

module.exports = { Expense };
