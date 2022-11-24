'use strict';

const { User } = require('../model/users');
const { Expense } = require('../model/expenses');

function syncTables() {
  User.sync({ force: true });
  Expense.sync({ force: true });
};

module.exports = { syncTables };
