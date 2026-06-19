/* eslint-disable no-console */
'use strict';

const express = require('express');
const { userRouter } = require('./routes/user.router');
const { expensesRouter } = require('./routes/expenses.router');
// const expenseServices = require('./services/expense.service');
// const usersServices = require('./services/user.service');

function createServer() {
  const app = express();

  app.get('/', (request, response) => {
    response.send('Hello');
  });

  // expenseServices.reset();
  // usersServices.reset();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
