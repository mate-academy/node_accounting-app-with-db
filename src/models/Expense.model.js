'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false, // allowNull defaults to true
  },
  spentAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false, // allowNull defaults to true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false, // allowNull defaults to true
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false, // allowNull defaults to true
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false, // allowNull defaults to true
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false, // allowNull defaults to true
  },
}, {
  tableName: 'expenses',
  createdAt: false,
  updatedAt: false,
});

module.exports = {
  Expense,
};
