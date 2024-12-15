'use strict';

const express = require('express');
const cors = require('cors');
const { userRouter } = require('./api/user.router.js');
const { expenseRouter } = require('./api/expense.router.js');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
};

module.exports = {
  createServer,
};
