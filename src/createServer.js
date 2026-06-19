'use strict';

const express = require('express');
const { expenseRouter, userRouter } = require('./routes');

const createServer = () => {
  // your code goes here
  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
};

module.exports = {
  createServer,
};
