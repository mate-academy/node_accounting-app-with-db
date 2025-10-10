'use strict';

const { expenseRouter } = require('./expense.router');
const { userRouter } = require('./user.router');

module.exports = {
  userRouter,
  expenseRouter,
};
