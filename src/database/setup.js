'use strict';

const User = require('../models/User');
const Expense = require('../models/Expense');

const setupDatabase = async() => {
  await User.sync({ force: true });
  await Expense.sync({ force: true });
};

module.exports = { setupDatabase };
