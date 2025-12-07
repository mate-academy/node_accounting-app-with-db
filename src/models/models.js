'use strict';

const { User, normalizeUsers } = require('./User.model');
const { Expense, normalizeExpenses } = require('./Expense.model');

module.exports = {
  normalizeUsers,
  normalizeExpenses,

  models: {
    User,
    Expense,
  },
};
