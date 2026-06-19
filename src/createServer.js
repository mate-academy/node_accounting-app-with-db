'use strict';

const cors = require('cors');
const express = require('express');
const { usersRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');
const { categoriesRouter } = require('./routes/categories.route');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);
  app.use('/categories', express.json(), categoriesRouter);

  return app;
}

module.exports = {
  createServer,
};
