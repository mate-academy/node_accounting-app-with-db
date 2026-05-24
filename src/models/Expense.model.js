'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');
const Expense = sequelize.define(
  'Expense',
  {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = {
  Expense,
};
