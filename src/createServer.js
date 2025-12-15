/* eslint-disable no-console */
'use strict';

const express = require('express');

const { userRouter } = require('./routers/user.router');
const { categoryRouter } = require('./routers/category.router');
const { expenseRouter } = require('./routers/expense.router');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => res.sendStatus(200));

  app.use('/users', userRouter);
  app.use('/category', categoryRouter);
  app.use('/expenses', expenseRouter);

  return app;
};

module.exports = { createServer };
