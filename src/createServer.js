'use strict';

const express = require('express');
const { clearUsers } = require('./services/users.services');
const { clearExpenses } = require('./services/expenses.services');
const { userRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');

const app = express();

function createServer() {
  clearUsers();
  clearExpenses();

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
