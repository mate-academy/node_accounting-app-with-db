'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define(
  // your code goes here
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
    },
    title: {
      type: DataTypes.TEXT,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.TEXT,
    },
    note: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'expenses',
    updatedAt: false,
    createdAt: false,
  },
);

module.exports = {
  Expense,
};
