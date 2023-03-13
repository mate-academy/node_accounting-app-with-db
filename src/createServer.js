'use strict';

const express = require('express');
const cors = require('cors');

const { userRouter } = require('./routes/user.router.js');
const { expenseRouter } = require('./routes/expense.router.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
