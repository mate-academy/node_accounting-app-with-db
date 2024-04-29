'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./endpoints/users/users.router');
const expensesRouter = require('./endpoints/expenses/expenses.router');

const createServer = () => {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter.router);
  app.use('/expenses', express.json(), expensesRouter.router);

  return app;
};

module.exports = {
  createServer,
};
