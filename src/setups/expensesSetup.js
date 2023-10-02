'use strict';

const { Expense } = require('../services/expenses.services');

Expense.sync({ force: true });
