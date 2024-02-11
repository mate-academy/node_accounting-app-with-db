'use strict';

const express = require('express');
const { router: usersRouter } = require('./routes/users.route');
const { router: expenseRouter } = require('./routes/expenses.route');

module.exports = {
  createServer,
};

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);

  app.use('/expenses', express.json(), expenseRouter);

  return app;
}
