'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');

// Expense.sync();
// User.sync();

module.exports = {
  models: {
    User,
    Expense,
  },
};
