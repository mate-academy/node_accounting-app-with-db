'use strict';

const express = require('express');
const userRouter = require('./routes/users.router');
const expensesRouter = require('./routes/expenses.router');
// const usersService = require('./services/users.service');
// const expensesService = require('./services/expenses.service');

function createServer() {
  // usersService.reset();
  // expensesService.reset();

  const app = express();

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
