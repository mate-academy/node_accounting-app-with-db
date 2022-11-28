'use strict';

const { User } = require('../model/users');
const { Expense } = require('../model/expenses');

User.sync({ force: true });
Expense.sync({ force: true });
