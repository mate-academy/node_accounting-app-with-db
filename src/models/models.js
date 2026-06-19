'use strict';

const { User } = require('./User.model.js');
const { Expense } = require('./Expense.model.js');
const { Category } = require('./Category.model.js');

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
