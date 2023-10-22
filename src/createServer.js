'use strict';

const userRouter = require('../src/routes/user.routes');
const expensesRouter = require('../src/routes/expenses.routes');

const express = require('express');

function createServer() {
  const app = express();

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
