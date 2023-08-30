'use strict';

const { sequelize } = require('../utils/client.js');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'User',
      key: 'id',
    },
  },
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'spent_at',
    defaultValue: DataTypes.NOW,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.NUMBER,
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
  tableName: 'expenses',
  updatedAt: false,
  createdAt: false,
});

module.exports = Expense;
