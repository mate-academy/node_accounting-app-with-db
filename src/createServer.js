'use strict';

const express = require('express');

const { router: usersRouter } = require('./routes/user.route');
const { router: expensesRouter } = require('./routes/expenses.route');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
