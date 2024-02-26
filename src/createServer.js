'use strict';

const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/user.route');
const { expensesRouter } = require('./routes/expenses.route');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
