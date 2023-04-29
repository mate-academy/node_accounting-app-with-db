'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Expense = sequelize.define('Expense', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  spentAt: {
    type: DataTypes.STRING,
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
    allowNull: false,
  },

  note: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'expenses',
  createdAt: false,
  updatedAt: false,
});

module.exports = {
  Expense,
};
