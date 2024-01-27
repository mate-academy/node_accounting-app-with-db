'use strict';

const { User } = require('./bd');
const { Expense } = require('./bd');

User.sync({ force: true });
Expense.sync({ force: true });
