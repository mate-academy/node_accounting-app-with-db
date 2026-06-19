'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');

User.hasMany(Expense, {
  foreignKey: 'userId',
  constraints: false,
});

Expense.belongsTo(User, {
  foreignKey: 'userId',
  constraints: false,
});

Category.hasMany(Expense, {
  foreignKey: 'category',
  targetKey: 'name',
  constraints: false,
});

Expense.belongsTo(Category, {
  foreignKey: 'category',
  targetKey: 'name',
  constraints: false,
});

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
