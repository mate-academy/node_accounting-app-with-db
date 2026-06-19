'use strict';

const express = require('express');
const { userRouter } = require('./routes/user.routes');
const { expenseRouter } = require('./routes/expense.routes');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
