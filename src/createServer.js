'use strict';

const express = require('express');
const usersRouters = require('./routes/users.routes');
const expensesRouters = require('./routes/expenses.routes');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use('/users', usersRouters);
  app.use('/expenses', expensesRouters);

  return app;
};

module.exports = {
  createServer,
};
