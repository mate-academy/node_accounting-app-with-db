'use strict';

const express = require('express');

const { router: usersRouter } = require('./routers/userRoutes');
const { router: expensesRouter } = require('./routers/expenseRoutes');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
