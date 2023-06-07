'use strict';

const express = require('express');

const userRouter = require('./routes/users');
const expenseRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', userRouter.router);
  app.use('/expenses', expenseRouter.router);

  return app;
}

module.exports = {
  createServer,
};
