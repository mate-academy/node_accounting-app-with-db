'use strict';

const { User } = require('../models/User.js');
const { Expense } = require('../models/Expense.js');

async function setupDatabase() {
  await User.sync({ force: true });
  await Expense.sync({ force: true });
};

module.exports = { setupDatabase };
