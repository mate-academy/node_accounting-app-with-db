'use strict';

const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');
const categoriesRouter = require('./routes/categories');

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

  app.use('/users', usersRouter);

  app.use('/expenses', expensesRouter);

  app.use('/categories', categoriesRouter);

  return app;
}

module.exports = {
  createServer,
};
