'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./category.model');

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
