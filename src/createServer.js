'use strict';
/* eslint-disable function-paren-newline */

const express = require('express');
const { json } = require('express');
const usersRoutes = require('./routes/userRoutes');
const expensesRoutes = require('./routes/expenseRoutes');
const { initUsers } = require('./services/userService');
const { initExpenses } = require('./services/expenseService');

function createServer() {
  const app = express();

  initUsers();
  initExpenses();

  app.use(json());
  app.use('/users', usersRoutes);
  app.use('/expenses', expensesRoutes);

  app.use((req, res) =>
    res.status(404).json({ message: 'Endpoint not found' }),
  );

  return app;
}

module.exports = { createServer };
