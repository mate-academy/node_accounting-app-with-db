'use strict';

const express = require('express');

const { usersRouter } = require('./routes/users');
const { expenseRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(usersRouter);
  app.use(expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
