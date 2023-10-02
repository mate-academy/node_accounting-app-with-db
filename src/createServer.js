/* eslint-disable no-console */
'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');
const usersServices = require('./services/users.services');
const expenseServices = require('./services/expenses.services');

function createServer() {
  const app = express();

  expenseServices.clear();
  usersServices.clear();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
