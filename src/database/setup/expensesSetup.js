'use strict';

const { Expense } = require('../expensesDb');

Expense.sync({ force: true });
