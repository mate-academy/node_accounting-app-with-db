'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');

User.hasMany(Expense, {
  foreignKey: 'userId',
  constraints: false,
  hooks: true,
});

Expense.belongsTo(User, {
  foreignKey: 'userId',
  constraints: false,
});

Category.hasMany(Expense, {
  foreignKey: 'categoryId',
  onDelete: 'CASCADE',
  constraints: false,
  hooks: true,
});

Expense.belongsTo(Category, {
  foreignKey: 'categoryId',
  constraints: false,
});

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
