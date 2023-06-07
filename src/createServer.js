'use strict';

const express = require('express');
const { resetExpenses } = require('./services/expense');
const { resetUsers } = require('./services/user');
const { userRouter } = require('./routes/user');
const { expenseRouter } = require('./routes/expense');

function createServer() {
  const app = express();

  resetExpenses();
  resetUsers();

  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
