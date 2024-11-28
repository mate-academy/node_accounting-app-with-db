'use strict';

/* const { resetAllUsers } = require('./services/users.service');
const { resetAllExpenses } = require('./services/expenses.service'); */

const { usersRouter } = require('./api/users.router');
const { expensesRouter } = require('./api/expenses.router');

const cors = require('cors');

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/expenses', expensesRouter);
  app.use('/users', usersRouter);

  return app;
}

module.exports = {
  createServer,
};
