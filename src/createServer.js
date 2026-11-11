'use strict';

const express = require('express');
const { createExpenses } = require('./routers/expenses.router');
const { createUsers } = require('./routers/users.router');

const createServer = () => {
  // your code goes here
  const app = express();

  app.use(express.json());

  app.use('/users', createUsers());

  app.use('/expenses', createExpenses());

  return app;
};

module.exports = {
  createServer,
};
