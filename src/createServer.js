'use strict';

const express = require('express');
const userRouter = require('./routes/users.router');
const expensesRouter = require('./routes/expenses.router');

function createServer() {
  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
