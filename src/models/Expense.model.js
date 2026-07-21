'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'id',
      allowNull: false,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'userId',
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
      field: 'spentAt',
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      field: 'title',
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      field: 'amount',
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      field: 'category',
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      field: 'note',
      allowNull: true,
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
