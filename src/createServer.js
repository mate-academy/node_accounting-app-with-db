'use strict';

const express = require('express');
const { reset: resetUsers } = require('./services/users');
const { reset: resetExpenses } = require('./services/expenses');
const { router: userRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  resetUsers();
  resetExpenses();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
