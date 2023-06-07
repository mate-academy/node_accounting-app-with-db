'use strict';

const { User } = require('../models/users');
const { Expense } = require('../models/expenses');

const setupDatabase = async() => {
  await User.sync();
  await Expense.sync();
};

module.exports = setupDatabase;
