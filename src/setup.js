'use strict';

const { User } = require('./models/userModel');

const { Expense } = require('./models/expenseModel');

User.sync({ force: true });
Expense.sync({ force: true });
