'use strict';

const { sequelize } = require('../utils/db');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define('expenses', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  updatedAt: false,
  createdAt: false,
});

module.exports = {
  Expense,
};
