'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const { User } = require('./userModel');

const Expense = sequelize.define(
  'Expense',
  {
    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
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
  },
  {
    updatedAt: false,
    createdAt: false,
  }
);

Expense.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  onUpdate: 'RESTRICT',
});

User.hasMany(Expense, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  onUpdate: 'RESTRICT',
});

module.exports = {
  Expense,
};
