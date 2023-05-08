'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase');

const Expense = sequelize.define('expense', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    primaryKey: false,
  },
  amount: {
    type: DataTypes.NUMBER,
    primaryKey: false,
  },
  category: {
    type: DataTypes.STRING,
    primaryKey: false,
  },
  note: {
    type: DataTypes.STRING,
    primaryKey: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'expenses',
  updatedAt: false,
});

module.exports = { Expense };
