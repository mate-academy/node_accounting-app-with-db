/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoute');
const expenseRouter = require('./routes/expenseRoute');
const categoryRouter = require('./routes/categoryRoute');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);
  app.use('/categories', categoryRouter);

  return app;
};

module.exports = {
  createServer,
};
