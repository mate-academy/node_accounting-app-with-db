'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const User = require('./user');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },

  spentAt: {
    type: DataTypes.DATE,
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
    allowNull: true,
  },
}, {
  tableName: 'expenses',
  timestamps: false,
});

Expense.belongsTo(User);
User.hasMany(Expense);

module.exports = Expense;
