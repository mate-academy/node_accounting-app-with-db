'use strict';

const express = require('express');
const usersRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');
const { initUsers } = require('./services/users.service');

function createServer() {
  const app = express();

  initUsers();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
