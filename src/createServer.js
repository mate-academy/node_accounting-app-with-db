'use strict';

const express = require('express');
const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expenses');
const categoryRoutes = require('./routes/categories');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', userRoutes);
  app.use('/expenses', expenseRoutes);
  app.use('/categories', categoryRoutes);

  return app;
}

module.exports = {
  createServer,
};
