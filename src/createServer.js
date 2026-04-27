'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const expensesRouter = require('./routes/expenses.routes');
const categoriesRouter = require('./routes/categories.routes');

const createServer = () => {
  const app = express();

  app.use(cors());

  app.use(express.json({ limit: '1mb' }));

  app.use('/users', userRouter);

  app.use('/expenses', expensesRouter);

  app.use('/categories', categoriesRouter);

  return app;
};

module.exports = {
  createServer,
};
