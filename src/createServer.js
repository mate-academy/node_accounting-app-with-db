'use strict';

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const expenseRouter = require('./routes/expenseRoutes');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(userRoutes);
  app.use(expenseRouter);

  return app;
};

module.exports = {
  createServer,
};
