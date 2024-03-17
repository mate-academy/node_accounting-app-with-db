'use strict';

const Expense = require('./Expense.model');
const ExpenseService = require('./Expense.service');
const ExpenseController = require('./Expense.controller');

class ExpenseProvider {
  constructor(userService) {
    this.service = new ExpenseService(Expense);
    this.controller = new ExpenseController(this.service, userService);
  }
}

module.exports = ExpenseProvider;
