'use strict';

const express = require('express');
const morgan = require('morgan');
const { userRouter } = require('./routes/userRoute');
const { expensesRoute } = require('./routes/expensesRoute');

function createServer() {
  const app = express();

  app.use(morgan('common'));
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRoute);

  return app;
}

module.exports = {
  createServer,
};
