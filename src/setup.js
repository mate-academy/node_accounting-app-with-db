'use strict';

const { Expense } = require('./models/expenseModel');
const { User } = require('./models/userModel');

async function recreateTables() {
  await User.sync({ force: true });
  await Expense.sync({ force: true });
};

module.exports = {
  recreateTables,
};
