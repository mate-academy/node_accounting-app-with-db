'use strict';

const { User } = require('./utils/User.js');
const { Expense } = require('./utils/Expense.js');

User.sync({ force: true });
Expense.sync({ force: true });
