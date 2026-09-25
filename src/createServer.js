'use strict';

const express = require('express');
const { usersRouter } = require('./routes/user.route');
const { expensesRouter } = require('./routes/expense.route');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    next();
  });
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
