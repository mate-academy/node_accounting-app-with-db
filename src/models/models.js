'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');
const { sequelize } = require('../db');

User.hasMany(Expense, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Expense.belongsTo(User, {
  foreignKey: 'userId',
});

Category.hasMany(Expense, {
  foreignKey: 'categoryId',
  onDelete: 'RESTRICT',
});

Expense.belongsTo(Category, {
  foreignKey: 'categoryId',
});

module.exports = {
  sequelize,
  models: {
    User,
    Expense,
    Category,
  },
};
