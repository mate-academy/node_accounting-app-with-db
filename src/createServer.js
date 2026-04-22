'use strict';

const express = require('express');
const cors = require('cors');
const userRoter = require('./routes/user.routes');
const expensesRouter = require('./routes/expenses.rotes');

const createServer = () => {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRoter);

  app.use('/expenses', express.json(), expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
