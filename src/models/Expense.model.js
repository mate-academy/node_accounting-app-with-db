'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id',
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'userId',
    },
    spentAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'spentAt',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'title',
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'amount',
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'category',
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'note',
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
