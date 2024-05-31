'use strict';

const { usersRouterApp } = require('./routes/users.routes.js');

const { expensesRouterApp } = require('./routes/expenses.routes.js');

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouterApp);
  app.use('/expenses', expensesRouterApp);

  return app;
}

module.exports = {
  createServer,
};
