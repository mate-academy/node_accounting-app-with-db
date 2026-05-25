'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./api/users.router');
const expensesRouter = require('./api/expenses.router');
const categoriesRouter = require('./api/categories.router');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);
  app.use('/categories', categoriesRouter);

  return app;
};

module.exports = {
  createServer,
};
