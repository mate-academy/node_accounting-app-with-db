'use strict';

const usersRouter = require('./routes/user.router');
const expensesRouter = require('./routes/expense.router');

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
