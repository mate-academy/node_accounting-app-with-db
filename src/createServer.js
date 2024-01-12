'use strict';

const express = require('express');
const { router: userRouter } = require('./users/users.routes');
const { router: expenseRouter } = require('./expenses/expenses.routes');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
