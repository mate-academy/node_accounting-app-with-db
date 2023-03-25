'use strict';

const { User } = require('./components/models/user.module');
const { Expense } = require('./components/models/expenses.module');

User.sync({ force: true });
Expense.sync({ force: true });
