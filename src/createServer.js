'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const expensesRouter = require('./routes/expenses.routes');
const categoriesRouter = require('./routes/categories.routes');

const createServer = () => {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);

  app.use('/expenses', express.json(), expensesRouter);

  app.use('/categories', express.json(), categoriesRouter);

  return app;
};

module.exports = {
  createServer,
};
