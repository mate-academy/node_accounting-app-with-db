'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../utils/db');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  createdAt: {
    type: DataTypes.DATE,
    field: 'spentAt',
    defaultValue: DataTypes.NOW,
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

  userId: {
    type: DataTypes.INTEGER,
  },
}, {
  updatedAt: false,
  tableName: 'expenses',
});

module.exports = { Expense };
