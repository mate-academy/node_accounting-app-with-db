'use strict';

const { userRouter } = require('./routes/users');
const { expenseRouter } = require('./routes/expenses');
const userService = require('./service/users');
const expenseService = require('./service/expenses');

const express = require('express');

function createServer() {
  const app = express();

  userService.initial();

  expenseService.initial();

  app.use(userRouter);

  app.use(expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
