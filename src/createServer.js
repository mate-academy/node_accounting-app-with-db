'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routers/users.router.js');
const { expensesRouter } = require('./routers/expenses.router.js');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
