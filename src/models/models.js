'use strict';

const { User } = require('./User.model');
const { Category } = require('./Category.model');
const { Expense } = require('./Expense.model');

Expense.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Expense, { foreignKey: 'categoryId' });

module.exports = {
  models: {
    User,
    Expense,
  },
};
