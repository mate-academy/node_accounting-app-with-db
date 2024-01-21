'use strict';

const express = require('express');

const { userRouter } = require('./routes/user.routes.js');
const { expenseRouter } = require('./routes/expense.routes.js');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use(userRouter);
  app.use(expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
