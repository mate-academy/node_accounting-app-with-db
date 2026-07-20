'use strict';

const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users.routes');
const expenseRoutes = require('./routes/expenses.routes');

const createServer = () => {
  // your code goes here
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/users', userRoutes);
  app.use('/expenses', expenseRoutes);

  return app;
};

module.exports = {
  createServer,
};
