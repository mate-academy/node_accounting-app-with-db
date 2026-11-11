'use strict';

const express = require('express');
const { createUsersRouter } = require('./routes/users');
const { createExpensesRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', createUsersRouter());
  app.use('/expenses', createExpensesRouter());

  return app;
}

module.exports = {
  createServer,
};
