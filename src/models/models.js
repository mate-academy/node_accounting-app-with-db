'use strict';

const { User } = require('./User.model.js');
const { Expense } = require('./Expense.model.js');

module.exports = {
  models: {
    User,
    Expense,
  },
};
