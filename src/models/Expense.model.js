'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'Expense',
  {
    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    note: {
      type: DataTypes.TEXT,
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
