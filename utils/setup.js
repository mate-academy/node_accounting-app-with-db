'use strict';

const { User, Expense } = require('../models');

async function setup() {
  await User.sync({ force: true });
  await Expense.sync({ force: true });
}

module.exports = { setup };
