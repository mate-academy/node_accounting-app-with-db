'use strict';

const { Expense } = require('./models/expense.model');
const { User } = require('./models/user.model');

async function createTables() {
  await User.sync();
  // eslint-disable-next-line no-console
  console.log('The table for the User model was just created!');
  await Expense.sync();
  // eslint-disable-next-line no-console
  console.log('The table for the Expense model was just created!');
}

createTables();
