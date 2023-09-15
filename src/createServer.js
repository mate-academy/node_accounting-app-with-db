'use strict';

const express = require('express');
const { userRouter } = require('./routes/users.js');
const { expensesRouter } = require('./routes/expenses.js');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

createServer().listen(5000);
