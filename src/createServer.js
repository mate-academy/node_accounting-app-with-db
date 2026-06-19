'use strict';

const express = require('express');

const userRoutes = require('./routes/user.routes');
const expenseRoutes = require('./routes/expense.routes');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use('/users', userRoutes);
  app.use('/expenses', expenseRoutes);

  return app;
};

module.exports = {
  createServer,
};
