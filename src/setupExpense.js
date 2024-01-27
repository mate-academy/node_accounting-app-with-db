'use strict';

const { Expense } = require('./bd');

Expense.sync({ force: true });
