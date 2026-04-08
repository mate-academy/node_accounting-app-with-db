'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');

// Expense.belongsTo(User);
// User.hasMany(Expense);

// Expense.belongsTo(Category);
// Category.hasMany(Expense);

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
