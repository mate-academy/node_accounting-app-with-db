'use strict';

const userRouter = require('./Users/users.routes');
const expensesRouter = require('./Expenses/expenses.routes');
const usersData = require('./resources/usersData');
const expensesData = require('./resources/expenseData');
const express = require('express');

const createServer = () => {
  const app = express();

  usersData.resetUsers();
  expensesData.resetExpenses();

  app.use(express.json());
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
