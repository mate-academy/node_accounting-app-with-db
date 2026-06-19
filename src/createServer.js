'use strict';

const express = require('express');
const cors = require('cors');
const { router: usersRouter } = require('./routes/users.route');
const { router: expensesRouter } = require('./routes/expense.route');
const { router: categoriesRouter } = require('./routes/category.route');

const createServer = () => {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);
  app.use('/categories', express.json(), categoriesRouter);

  return app;
};

module.exports = {
  createServer,
};
