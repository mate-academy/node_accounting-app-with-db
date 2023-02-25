'use strict';

const User = require('./models/user');
const Expense = require('./models/expense');

User.sync({ force: true });
Expense.sync({ force: true });
