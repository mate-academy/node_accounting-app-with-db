'use strict';

const cors = require('cors');
const expenseRoutes = require('./routers/expenses-Routers');
const userRoutes = require('./routers/users-Routers');
const express = require('express');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', userRoutes);

  app.use('/expenses', expenseRoutes);

  return app;
}

module.exports = {
  createServer,
};
