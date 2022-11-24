'use strict';

const express = require('express');
const { syncTables } = require('./utils/setup');

const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  syncTables();

  return app;
}

module.exports = {
  createServer,
};
