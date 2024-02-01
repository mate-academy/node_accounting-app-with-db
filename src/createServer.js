'use strict';

const { userRouter } = require('./routes/user.router');
const { expensesRouter } = require('./routes/expenses.router');

const express = require('express');
// const { resetUsers } = require('./services/users.services');
// const { resetExpenses } = require('./services/expenses.services');

function createServer() {
  const app = express();

  // resetUsers();
  // resetExpenses();

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
