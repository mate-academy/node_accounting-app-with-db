'use strict';

const express = require('express');
const cors = require('cors');
const { UserRouter } = require('./modules/User/user.router');
const { ExpenseRouter } = require('./modules/Expense/Expense.router');

function createServer() {
  const app = express();

  app.use(cors());

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });

  app.use(express.json());
  app.use('/users', UserRouter);
  app.use('/expenses', ExpenseRouter);

  return app;
}

module.exports = {
  createServer,
};
