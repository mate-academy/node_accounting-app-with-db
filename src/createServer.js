'use strict';

const express = require('express');
const userRoutes = require('./routes/users.router.js');
const expensesRoutes = require('./routes/expenses.router.js');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', userRoutes);
  app.use('/expenses', expensesRoutes);

  app.use((req, res) => {
    res.status(404).send('Route not found');
  });

  return app;
}

module.exports = { createServer };
