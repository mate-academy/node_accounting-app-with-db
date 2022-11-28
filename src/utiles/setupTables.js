'use strict';

function setupTables() {
  const { User } = require('../data-models/user-model.js');
  const { Expense } = require('../data-models/expense-model.js');

  User.sync();
  Expense.sync();
}

exports.setupTables = setupTables;
