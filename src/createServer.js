'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.routes');
const { expensesRoutes } = require('./routes/expenses.routes');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRoutes);

  return app;
}

module.exports = {
  createServer,
};
