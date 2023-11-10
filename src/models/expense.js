'use strict';

const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define('Expense', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  spentAt: {
    type: DataTypes.DATE,
  },
  category: {
    type: DataTypes.TEXT,
  },
  note: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'expenses',
  createdAt: false,
  updatedAt: false,
});

module.exports = Expense;
