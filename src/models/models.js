'use strict';

const { User } = require('./User.model.mjs');
const { Expense } = require('./Expense.model.mjs');

module.exports = {
  models: {
    User,
    Expense,
  },
};
