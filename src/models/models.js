'use strict';

const { User } = require('./userModel');
const { Expense } = require('./expenseModel');

module.exports = {
  models: {
    User,
    Expense,
  },
};
