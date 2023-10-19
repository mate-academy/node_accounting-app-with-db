'use strict';

const { Expense } = require('../services/expense.service');

Expense.sync({ force: true });
