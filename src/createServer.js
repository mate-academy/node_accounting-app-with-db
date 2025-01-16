'use strict';

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

function createServer() {
  const app = express();

  app.use('/users', userRoutes);

  app.use('/expenses', expenseRoutes);

  return app;
}

module.exports = {
  createServer,
};
