'use strict';

const express = require('express');
const { userRouter } = require('./routes/usersRoute');
const { expenseRouter } = require('./routes/expenseRoute');

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
