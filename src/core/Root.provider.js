'use strict';

const ExpenseProvider = require('../modules/Expense/Expense.provider');
const UserProvider = require('../modules/User/User.provider');

class RootProvider {
  constructor() {
    this.user = new UserProvider();
    this.expense = new ExpenseProvider(this.user.service);
  }
}

module.exports = RootProvider;
