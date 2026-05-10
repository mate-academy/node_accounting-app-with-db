'use strict';

const expenseRouter = require('./expense.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');

module.exports = {
  userRouter,
  expenseRouter,
  categoryRouter,
};
