'use strict';

const express = require('express');
const { expensesRouter } = require('./router/expense.router');
const { usersRouter } = require('./router/user.router');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
