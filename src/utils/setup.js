'use strict';

const { User } = require('../models/Users');
const { Expense } = require('../models/Expenses');

User.sync();
Expense.sync();
