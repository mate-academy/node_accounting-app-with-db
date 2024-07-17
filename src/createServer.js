'use strict';

const express = require('express');
const { router: userRouter } = require('./routes/users.routes');
const { router: expensesRouter } = require('./routes/expense.routes');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
