'use strict';

const { User } = require('./user');
const { Expense } = require('./expense');

User.sync({ force: true });
Expense.sync({ force: true });
