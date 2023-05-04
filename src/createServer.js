'use strict';

const express = require('express');
const cors = require('cors');

const { router: userRouter } = require('./routes/users');
const { router: expenseRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
