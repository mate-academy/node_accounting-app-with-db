'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');

Expense.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Expense, { foreignKey: 'categoryId' });

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
