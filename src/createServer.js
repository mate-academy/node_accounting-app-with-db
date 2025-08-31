'use strict';

const express = require('express');

const expensesRoutes = require('./routes/expenses');
const categoriesRoutes = require('./routes/categories');
const usersRoutes = require('./routes/users');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use('/expenses', expensesRoutes);
  app.use('/categories', categoriesRoutes);
  app.use('/users', usersRoutes);

  return app;
};

module.exports = {
  createServer,
};
