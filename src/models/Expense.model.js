'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'expense',
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    spentAt: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    category: { type: DataTypes.STRING },
    categoryId: { type: DataTypes.INTEGER, references: { model: 'categories', key: 'id' } },
    note: { type: DataTypes.STRING },
  },
  { timestamps: false },
);

module.exports = {
  Expense,
};
