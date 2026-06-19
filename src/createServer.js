'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { router: usersRouter } = require('./routes/users');
const expensesRouter = require('./routes/expenses');
const categoriesRouter = require('./routes/categories');

const createServer = () => {
  const app = express();

  // Middleware for parsing JSON
  app.use(bodyParser.json());

  // Mount routes
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);
  app.use('/categories', categoriesRouter);

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({ status: 'Accounting API is running' });
  });

  return app;
};

module.exports = {
  createServer,
};
