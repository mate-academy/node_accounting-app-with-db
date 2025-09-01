'use strict';

const express = require('express');

const expensesRoutes = require('./routes/expenses.route');
const categoriesRoutes = require('./routes/categories.route');
const usersRoutes = require('./routes/users.route');
const errorHandler = require('./middleware/errorHandler');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use('/expenses', expensesRoutes);
  app.use('/categories', categoriesRoutes);
  app.use('/users', usersRoutes);

  app.use(errorHandler);

  return app;
};

module.exports = {
  createServer,
};
