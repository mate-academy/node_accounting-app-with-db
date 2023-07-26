'use strict';

const express = require('express');
const { router: usersRouter } = require('./routers/users');
const { router: expensesRouter } = require('./routers/expenses');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
