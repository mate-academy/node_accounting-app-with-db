'use strict';

const _require = require('sequelize');
const DataTypes = _require.DataTypes;

const _require2 = require('../db.js');
const sequelize = _require2.sequelize;

const Expense = sequelize.define(
  'Expense',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
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
  Expense: Expense,
};
