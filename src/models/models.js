'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');

Expense.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

Category.hasMany(Expense, {
  foreignKey: 'categoryId',
  as: 'expenses',
});

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
