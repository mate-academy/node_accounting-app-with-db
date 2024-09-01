'use strict';

const express = require('express');
const { usersRoutes } = require('./routes/usersRoutes');
const { expensesRoutes } = require('./routes/expensesRoutes');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRoutes);
  app.use('/expenses', express.json(), expensesRoutes);

  return app;
}

module.exports = {
  createServer,
};
