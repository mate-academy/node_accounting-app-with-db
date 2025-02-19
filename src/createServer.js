'use strict';

const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routers/user.router');
const { expensesRouter } = require('./routers/expenses.router');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
