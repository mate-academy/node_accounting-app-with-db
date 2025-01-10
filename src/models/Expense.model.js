'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define(
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
      field: 'user_id',
    },
    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'spent_at',
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '',
    },
    note: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '',
    },
  },
  {
    tableName: 'expenses',
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = {
  Expense,
};
