'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
      field: 'spent_at',
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: false,
    },
    note: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Expense',
    updatedAt: false,
    createdAt: false,
  },
);

module.exports = {
  Expense,
};
