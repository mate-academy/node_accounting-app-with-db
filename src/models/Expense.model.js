'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'Expense',
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    spentAt: { type: DataTypes.DATE, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
    note: { type: DataTypes.STRING, allowNull: false },
  },
  {
    createdAt: false,
    updatedAt: false,
    tableName: 'expenses',
  },
);

module.exports = {
  Expense,
};
