'use strict';

const express = require('express');
const cors = require('cors');

const { router: userRouter } = require('./routes/user.router');
const { router: expenseRouter } = require('./routes/expense.router');
const userService = require('./services/user.service');
const expenseService = require('./services/expense.service');

function createServer() {
  const app = express();

  app.use(cors());

  userService.removeAllUsers();
  expenseService.removeAllExpenses();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
