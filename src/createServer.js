'use strict';

const express = require('express');
const { userRouter } = require('./routes/users.router.js');
const { expenseRouter } = require('./routes/expenses.router');

function createServer() {
  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
