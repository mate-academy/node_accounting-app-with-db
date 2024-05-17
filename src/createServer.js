'use strict';

const express = require('express');
const userRoute = require('./routes/user.route');
const expensesRoute = require('./routes/expenses.route');

function createServer() {
  const app = express();

  app.use('/users', express.json(), userRoute);
  app.use('/expenses', express.json(), expensesRoute);

  return app;
}

module.exports = {
  createServer,
};
