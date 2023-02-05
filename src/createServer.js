'use strict';

const express = require('express');

const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

const expenseService = require('./services/expenses');
const userService = require('./services/users');

function createServer() {
  const app = express();

  expenseService.reset();
  userService.reset();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
