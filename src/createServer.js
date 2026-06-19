'use strict';

const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users.route');
const expenseRoutes = require('./routes/expenses.route');
const categoryRoutes = require('./routes/category.route');
const { resetUsers } = require('./services/user.service');
const { resetExpenses } = require('./services/expenses.service');

const createServer = async () => {
  await resetUsers();
  await resetExpenses();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRoutes);
  app.use('/expenses', expenseRoutes);
  app.use('/category', categoryRoutes);

  return app;
};

module.exports = {
  createServer,
};
