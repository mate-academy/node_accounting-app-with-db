'use strict';

const express = require('express');

const expensesRoutes = require('./routes/expenses-routes');
const usersRoutes = require('./routes/users-routes');

function createServer() {
  const app = express();

  app.use(usersRoutes);
  app.use(expensesRoutes);

  return app;
}

module.exports = {
  createServer,
};
