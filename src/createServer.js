'use strict';

const express = require('express');
const { router: userRoutes } = require('./users/user.route');
const { router: expenseRoutes } = require('./expenses/expense.route');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', userRoutes);

  app.use('/expenses', expenseRoutes);

  return app;
}

module.exports = {
  createServer,
};
