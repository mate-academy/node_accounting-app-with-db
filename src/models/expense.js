'use strict';

const { sequelize } = require('../database/db');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define('Expense', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.DATE,
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
}, {
  tableName: 'expenses',
  updatedAt: false,
  createdAt: false,
});

module.exports = { Expense };
