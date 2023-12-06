'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Expense = sequelize.define(
  'Expense',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      require: true,
    },
    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      require: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
      require: false,
      defaultValue: '',
    },
  },
  {
    tableName: 'expenses',
  }
);

module.exports = { Expense };
