'use strict';

const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/usersRoutes');
const expensesRoutes = require('./routes/expensesRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRoutes);
  app.use('/expenses', expensesRoutes);
  app.use('/categories', categoriesRoutes);

  return app;
};

module.exports = {
  createServer,
};
