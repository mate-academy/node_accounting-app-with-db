'use strict';

const express = require('express');

const usersRoute = require('./routes/users.route');
const expensesRoute = require('./routes/expenses.route');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', usersRoute.route);
  app.use('/expenses', expensesRoute.route);

  return app;
}

module.exports = {
  createServer,
};
