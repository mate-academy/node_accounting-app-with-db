'use strict';

const express = require('express');
const usersRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');
const { initUsers } = require('./services/users.service');
const { initExpenses } = require('./services/expenses.service');

function createServer() {
  const app = express();

  initUsers();
  initExpenses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
