'use strict';

const express = require('express');

const usersRouter = require('./routes/users.routes');
const expensesRouter = require('./routes/expenses.routes');
const { clearUsers } = require('./services/users.service');
const { clearExpenses } = require('./services/expenses.service');

function createServer() {
  const app = express();

  clearUsers();
  clearExpenses();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
