'use strict';

const { User } = require('./models/User');
const { Expense } = require('./models/Expense');

User.sync({ alter: true });
Expense.sync({ alter: true });
