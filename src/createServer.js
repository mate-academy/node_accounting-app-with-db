'use strict';

const express = require('express');
const usersService = require('./services/users.service');
const expenseService = require('./services/expense.service');
const usersRouter = require('./routes/users.router');
const expensesRouter = require('./routes/expense.router');

function createServer() {
  usersService.reset();
  expenseService.reset();

  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
