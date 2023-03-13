'use strict';

const { sequelize } = require('../utils/database');
const { DataTypes } = require('sequelize');
const { Category } = require('./category');
const { User } = require('./user');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNul: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNul: false,
    foreignKey: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'spentAt',
    allowNul: false,
    defaultValue: DataTypes.NOW,
  },
  note: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNul: false,
    foreignKey: true,
  },
}, {
  tableName: 'expenses',
  updatedAt: false,
});

Expense.belongsTo(Category, {
  foreignKey: 'categoryId',
});

Category.hasOne(Expense);

Expense.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasMany(Expense);

module.exports = {
  Expense,
};
