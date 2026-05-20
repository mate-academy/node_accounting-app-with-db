'use strict';

const express = require('express');
const cors = require('cors');
const { notFound } = require('./middleware/notFound');
const { usersRoute } = require('./routes/users');
const { expensesRoute } = require('./routes/expenses');
const { errorHandler } = require('./middleware/errorHandler');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  })

  app.use('/users', usersRoute);
  app.use('/expenses', expensesRoute);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

module.exports = {
  createServer,
};
