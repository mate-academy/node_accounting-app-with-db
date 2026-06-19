'use strict';

const express = require('express');
const usersRouter = require('./routes/users.router');
const expensesRouter = require('./routes/expenses.router');
const userService = require('./services/users.service');
const expenseService = require('./services/expenses.service');

function createServer() {
  const app = express();

  userService.reset();
  expenseService.reset();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
