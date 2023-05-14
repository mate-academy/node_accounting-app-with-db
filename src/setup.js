'use strict';

const { User } = require('./services/users');
const { Expense } = require('./services/expenses');

User.sync({ alter: true });
Expense.sync({ alter: true });
