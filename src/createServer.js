'use strict';

const cors = require('cors');
const express = require('express');
const userRouter = require('./routers/users.router');
const expensesRouter = require('./routers/expenses.router');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
