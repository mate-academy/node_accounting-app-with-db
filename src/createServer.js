'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.router');
const { expensesRouter } = require('./routes/expenses.router');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  return app;
};

module.exports = {
  createServer,
};
