'use strict';

const { Expense } = require('../models/expenseModel');
const { User } = require('../models/userModel');

User.sync({ alter: true });
Expense.sync({ alter: true });
