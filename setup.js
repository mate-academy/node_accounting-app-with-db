'use strict';

const { Expense } = require('./src/models/Expense');
const { User } = require('./src/models/User');

User.sync({ force: true });
Expense.sync({ force: true });
