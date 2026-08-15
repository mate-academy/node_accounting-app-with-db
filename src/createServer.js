'use strict';

const express = require('express');
const cors = require('cors');

const createUserService = require('./services/user.service.js');
const createExpenseService = require('./services/expense.service.js');
const createUserRouter = require('./routes/user.route.js');
const createExpenseRouter = require('./routes/expense.route.js');

function createServer() {
  const app = express();

  const userService = createUserService();
  const expenseService = createExpenseService();

  const userRouter = createUserRouter(userService);
  const expenseRouter = createExpenseRouter(userService, expenseService);

  app.use(cors());
  app.use(express.json());

  app.use('/', userRouter);
  app.use('/', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
