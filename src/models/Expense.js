'use strict';

const { sequelize } = require('../utils/db');
const { DataTypes } = require('sequelize');

const { User } = require('./User');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  uresId: {
    field: 'user_id',
    type: DataTypes.INTEGER,
  },
  spentAt: {
    field: 'spent_at',
    type: DataTypes.DATE,
    allowNull: false,
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
    allowNull: true,
  },
}, {
  tableName: 'expenses',
  updatedAt: false,
});

Expense.belongsTo(User, {
  foreignKey: 'user_id',
  constraints: false,
});

module.exports = { Expense };
