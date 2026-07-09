'use strict';

const express = require('express');

const usersRouter = require('./routes/Users.route.js');
const expensesRouter = require('./routes/Expenses.route.js');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8');

    next();
  });

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
