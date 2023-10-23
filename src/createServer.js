'use strict';

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const createServer = (
  initialUsers = [],
  initialExpenses = [],
  initialCategories = []
) => {
  const users = [...initialUsers];
  const expenses = [...initialExpenses];

  const app = express();

  app.use(express.json());

  app.use('/users', userRoutes(users));
  app.use('/expenses', expenseRoutes(expenses, users));
  app.use('/categories', categoryRoutes());

  return app;
};

module.exports = {
  createServer,
};
