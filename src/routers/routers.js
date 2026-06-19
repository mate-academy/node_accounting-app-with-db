'use strict';

const { userRouter } = require('./user.router');
const { expenseRouter } = require('./expense.router');
const { categoryRouter } = require('./category.router');

module.exports = {
  userRouter,
  expenseRouter,
  categoryRouter,
};
