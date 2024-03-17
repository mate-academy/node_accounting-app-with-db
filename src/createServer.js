'use strict';

const express = require('express');
const { userRouter } = require('./routes/user.route');
const { expenseRouter } = require('./routes/expense.route');

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
