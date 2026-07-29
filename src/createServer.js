'use strict';

const express = require('express');
const usersRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');

const createServer = () => {
  const app = express();

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });
  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  app.use((req, res, next) => {
    res.sendStatus(404);
  });

  return app;
};

module.exports = {
  createServer,
};
