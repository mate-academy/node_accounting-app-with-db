'use strict';

const express = require('express');
const cors = require('cors');

const { usersRouter } = require('./routes/users.router');
const { expensesRouter } = require('./routes/expenses.router');
const { categoriesRouter } = require('./routes/categories.route');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);
  app.use('/categories', categoriesRouter);

  return app;
};

module.exports = {
  createServer,
};
