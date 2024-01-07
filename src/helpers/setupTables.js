'use strict';

const { userService } = require('../services/user.service.js');
const { expenseService } = require('../services/expense.service.js');
const { categoryService } = require('../services/category.service.js');

userService.User.sync();
expenseService.Expense.sync();
categoryService.Category.sync();
