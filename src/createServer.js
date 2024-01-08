'use strict';

const express = require('express');
const cors = require('cors');

const { userRouter } = require('./routes/user.route.js');
const { expenseRouter } = require('./routes/expense.route.js');
const { categoryRouter } = require('./routes/category.route.js');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);
  app.use('/categories', express.json(), categoryRouter);

  return app;
}

module.exports = {
  createServer,
};
