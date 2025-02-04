'use strict';

const express = require('express');
const cors = require('cors');

const { router: userRouter } = require('./routers/user.route');
const { router: expenseRouter } = require('./routers/expense.route');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
};

module.exports = {
  createServer,
};
