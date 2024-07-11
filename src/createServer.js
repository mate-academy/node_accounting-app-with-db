'use strict';

const express = require('express');
const { initExpenses } = require('./services/expenses.service');
const { usersRouter } = require('./routes/usersRoute');
const { expensesRouter } = require('./routes/expensesRoute');
const { initUsers } = require('./services/users.service');

function createServer() {
  const app = express();

  initUsers();
  initExpenses();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
