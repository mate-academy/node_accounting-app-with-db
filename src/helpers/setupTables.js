'use strict';

const { userService } = require('../services/user.service.js');
const { expenseService } = require('../services/expense.service.js');

userService.User.sync();
expenseService.Expense.sync();
