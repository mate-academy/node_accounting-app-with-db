'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Expenses = sequelize.define('expenses', {
  userId: {
    type: DataTypes.INTEGER,
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
    allowNull: false,
  },

  spentAt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'expenses',
  updatedAt: false,
  createdAt: false,
});

module.exports = { Expenses };
