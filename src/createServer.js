'use strict';

const express = require('express');
const cors = require('cors');
const { router: userRouter } = require('./routes/user.route.js');
const { router: expensesRouter } = require('./routes/expenses.route.js');
const { router: categoryRouter } = require('./routes/category.route.js');

require('./models/models');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);
  app.use('/categories', categoryRouter);

  return app;
};

module.exports = { createServer };
