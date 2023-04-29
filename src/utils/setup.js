'use strict';

const Expense = require('../models/expenses');
const User = require('../models/users');

Expense.sync({ force: true });
User.sync({ force: true });
