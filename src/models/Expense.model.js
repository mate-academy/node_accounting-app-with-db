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
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
      primaryKey: false,
    },
    title: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
      defaultValue: 'other',
    },
    note: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'expenses',
  },
);

module.exports = {
  Expense,
};
