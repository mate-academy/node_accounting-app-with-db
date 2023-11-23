'use strict';

const { User } = require('./usersService');
const { Expense } = require('./expensesService');

User.sync({ force: true });
Expense.sync({ force: true });
