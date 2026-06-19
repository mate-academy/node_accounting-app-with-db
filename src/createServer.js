'use strict';

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const expensesRoutes = require('./routes/expensesRoutes');
const categoryRoutes = require('./routes/categoryRoute');
const { sequelize } = require('./db');

function createServer() {
  const app = express();

  app.use('/users', express.json(), userRoutes);
  app.use('/expenses', express.json(), expensesRoutes);
  app.use('/categories', express.json(), categoryRoutes);

  return app;
}

require('./associations');
sequelize.authenticate();

module.exports = {
  createServer,
};
