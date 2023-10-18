'use strict';

const { Expense } = require('./services/expenses.service');
const { User } = require('./services/users.service');

User.sync({ force: true });
Expense.sync({ force: true });
