'use strict';

const { User } = require('./models/users');
const { Expense } = require('./models/expenses');

User.sync({ force: true });
Expense.sync({ force: true });
