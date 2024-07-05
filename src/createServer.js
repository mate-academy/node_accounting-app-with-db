'use strict';

const express = require('express');

const { router: expenseRouter } = require('./routes/expense.route');
const { router: userRouter } = require('./routes/users.route');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/', expenseRouter);

  app.use('/', userRouter);

  return app;
}

module.exports = {
  createServer,
};
