'use strict';

const { sequelize } = require('../db.js');
const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');

User.hasMany(Expense, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  hooks: true,
});

Expense.belongsTo(User, {
  foreignKey: 'userId',
});

Category.hasMany(Expense, {
  foreignKey: 'categoryId',
});

Expense.belongsTo(Category, {
  foreignKey: 'categoryId',
  onDelete: 'SET NULL',
});

module.exports = {
  sequelize,
  models: {
    User,
    Expense,
    Category,
  },
};
