'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');

User.hasMany(Expense, {
  foreignKey: 'userId',
  as: 'expenses',
  onDelete: 'CASCADE',
});

Category.hasMany(Expense, {
  foreignKey: 'categoryId',
  as: 'expenses',
  onDelete: 'SET NULL',
});

Expense.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Expense.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
