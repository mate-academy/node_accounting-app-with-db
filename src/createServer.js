'use strict';

const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/users.js').router;
const expenseRouter = require('./routers/expenses.js').router;

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = { createServer };
