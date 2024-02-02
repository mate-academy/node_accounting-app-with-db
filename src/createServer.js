'use strict';

const express = require('express');
const usersRouter = require('./routes/users.routes');
const expensesRouter = require('./routes/expenses.routes');
const { connection } = require('./utils/db');
const errorHandler = require('./utils/errorHandler');

async function createServer() {
  const app = express();

  await connection();
  app.use(errorHandler);
  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
