'use strict';

const express = require('express');

const userRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  app.use('/users', userRouter(users));

  app.use('/expenses', expensesRouter(users, expenses));

  return app;
}

module.exports = {
  createServer,
};
