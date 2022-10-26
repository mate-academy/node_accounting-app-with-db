'use strict';

const express = require('express');
const { userRouter } = require('./routes/users');
const { expenseRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
