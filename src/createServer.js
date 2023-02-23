'use strict';

const express = require('express');
const userRouter = require('./routes/user').router;
const expensesRouter = require('./routes/expenses').router;

function createServer() {
  const app = express();

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
