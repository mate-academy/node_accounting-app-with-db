'use strict';

const express = require('express');
const { router: usersRouter } = require('./routes/users.route');
const { router: expenseRouter } = require('./routes/expenses.route');

module.exports = {
  createServer,
};

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expenseRouter);

  return app;
}
