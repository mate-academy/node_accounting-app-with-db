'use strict';

const { Expense } = require('./sevices/expenses.service.js');

Expense.sync({ force: true });
