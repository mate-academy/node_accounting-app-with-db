'use strict';

const express = require('express');
const { expensesRouter } = require('./routes/exspensesRouter');
const { userRouter } = require('./routes/users.router');

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
