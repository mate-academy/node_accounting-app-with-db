'use strict';

const { User } = require('./models/users.js');
const { Expense } = require('./models/expenses.js');

User.sync();
Expense.sync();
