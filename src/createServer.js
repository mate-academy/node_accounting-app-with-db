'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route.js');
const expensesRouter = require('./routes/expenses.route.js');
const categoriesRouter = require('./routes/categories.route.js');
const userService = require('./services/user.service.js');
// const expensesService = require('./services/expenses.service.js');

const createServer = () => {
  userService.reset();
  // expensesService.reset();

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
