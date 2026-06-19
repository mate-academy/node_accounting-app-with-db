'use strict';

const { userController } = require('../controllers/user.controller');
const { expenseController } = require('../controllers/expense.controller');
const { categoryController } = require('../controllers/category.controller');

module.exports = {
  userController,
  expenseController,
  categoryController,
};
