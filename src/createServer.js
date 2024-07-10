'use strict';

const express = require('express');

const { userRoute } = require('./routes/userRoute');
const { expenseRouter } = require('./routes/expenseRoute');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', userRoute);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
