'use strict';

function setupTables() {
  const { User } = require('../data-models/user-model.js');
  const { Expense } = require('../data-models/expense-model.js');

  User.sync({ force: true });
  Expense.sync({ force: true });
}

exports.setupTables = setupTables;
