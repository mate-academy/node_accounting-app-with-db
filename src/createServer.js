'use strict';

const express = require('express');
const userService = require('./services/user.service');
const expenseService = require('./services/expense.service');
const userRouter = require('./routes/user.route');
const expenseRouter = require('./routes/expense.route');

function createServer() {
  userService.reset();
  expenseService.reset();

  const app = express();

  app.use('/users', express.json(), userRouter);

  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
