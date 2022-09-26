'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

require('dotenv').config();

const { DB_NAME } = process.env;

const Expense = sequelize.define('Expense', {
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
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
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: DB_NAME,
});

Expense.sync();

module.exports = {
  Expense,
};
