'use strict';

const { User } = require('../models/users');
const { Expense } = require('../models/expenses');

const setupDatabase = async() => {
  await User.sync({ force: false });
  await Expense.sync({ force: false });
};

module.exports = setupDatabase;
