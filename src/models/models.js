/* eslint-disable prettier/prettier */
'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');

module.exports = {
  models: {
    User,
    Expense,
  },
};
