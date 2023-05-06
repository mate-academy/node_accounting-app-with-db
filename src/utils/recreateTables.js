'use strict';

const { User } = require('../models/users');
const { Expense } = require('../models/expenses');

async function recreateTables() {
  await User.sync({ force: true });
  await Expense.sync({ force: true });
}

module.exports = {
  recreateTables,
};
