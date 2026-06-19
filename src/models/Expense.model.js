'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'Expense',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = {
  Expense,
};
