'use strict';

const { User } = require('./services/users.service');
const { Expense } = require('./services/expenses.services');

User.sync({ force: true });
Expense.sync({ force: true });
