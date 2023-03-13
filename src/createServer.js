'use strict';

const express = require('express');
const userService = require('./services/users');
const expenseService = require('./services/expenses');
const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

function createServer() {
  userService.setEmptyUsers();
  expenseService.setEmptyExpenses();

  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
