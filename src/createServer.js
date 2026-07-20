'use strict';

const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users.routes');
const expenseRoutes = require('./routes/expenses.routes');

const createServer = () => {
  // your code goes here
  const app = express();

  app.use(cors());
  app.use(express.json({ defaultCharset: 'utf-8' }));
  app.use(express.urlencoded({ extended: true, defaultCharset: 'utf-8' }));

  app.use('/users', userRoutes);
  app.use('/expenses', expenseRoutes);

  return app;
};

module.exports = {
  createServer,
};
