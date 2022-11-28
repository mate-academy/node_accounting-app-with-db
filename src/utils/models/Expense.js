'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../utils/db');
const { User } = require('./User');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
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
  createdAt: {
    type: DataTypes.DATE,
    field: 'spentAt',
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

}, {
  tableName: 'expenses',
  updatedAt: false,
});

Expense.belongsTo(User, {
  foreignKey: 'userId',
  constraints: false,
});

module.exports = {
  Expense,
};
