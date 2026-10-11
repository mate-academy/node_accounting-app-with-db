'use strict';

const userRouter = require('./routers/users.router');
const expenseRouter = require('./routers/expenses.router');

const express = require('express');

function createServer() {
  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
