'use strict';

const { User } = require('./models/User');
const { Expense } = require('./models/Expense');

User.sync({ force: true });
Expense.sync({ force: true });
