const express = require('express');
const userRoutes = require('./routes/users.routes');
const expenseRoutes = require('./routes/expenses.routes');
const categoryRoutes = require('./routes/categories.routes');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use('/categories', categoryRoutes);
  app.use('/users', userRoutes);
  app.use('/expenses', expenseRoutes);

  return app;
};

module.exports = {
  createServer,
};
