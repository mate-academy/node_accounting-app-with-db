'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

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
      allowNull: false,
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
      allowNull: true,
      defaultValue: null,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'expenses',
    timestamps: false,
  },
);

module.exports = {
  Expense,
};
