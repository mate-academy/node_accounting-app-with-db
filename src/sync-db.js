'use strict';

const User = require('./models/users.js');
const Expense = require('./models/expense.js');

User.sync({ force: true });
Expense.sync({ force: true });
