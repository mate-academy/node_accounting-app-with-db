'use strict';

const express = require('express');
const { userRouter } = require('./routes/users.js');
const { expensesRouter } = require('./routes/expenses.js');

const jsonMiddleware = express.json();

function createServer() {
  const app = express();

  app.use('/users', jsonMiddleware, userRouter);
  app.use('/expenses', jsonMiddleware, expensesRouter);

  return app;
}

createServer().listen(5000);
