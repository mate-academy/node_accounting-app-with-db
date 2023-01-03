'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

const { resetExpenses } = require('./services/expenses');
const { resetUsers } = require('./services/users');

function createServer() {
  const app = express();

  resetExpenses();
  resetUsers();

  app.use(cors());
  app.use('/', express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
