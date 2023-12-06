'use strict';

const express = require('express');
const { router: userRouter } = require('./routes/users.route');
const { router: expensesRouter } = require('./routes/expenses.route');
const { resetUsers } = require('./services/users.service');
const { resetExpenses } = require('./services/expenses.service');

function createServer() {
  resetUsers();
  resetExpenses();

  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
