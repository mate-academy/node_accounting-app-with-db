'use strict';

const express = require('express');
const { userRouter } = require('./routes/users.js');
const { expensesRouter } = require('./routes/expenses.js');

function createServer() {
  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

createServer().listen(5000);
