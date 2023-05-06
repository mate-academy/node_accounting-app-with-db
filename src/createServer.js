'use strict';

const express = require('express');

const { recreateTable } = require('./utils/recreateTables');

const { reset: resetExpenses } = require('./services/expenses');
const { router: userRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

async function createServer() {
  const app = express();

  await recreateTable();
  resetExpenses();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
