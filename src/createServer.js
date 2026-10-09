'use strict';

const express = require('express');
const usersRouter = require('./users/users.router.js');
const expensesRouter = require('./expenses/expenses.router.js');

const createServer = () => {
  const app = express();

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
