/* eslint-disable no-console */
'use strict';

const cors = require('cors');
const express = require('express');
const userRouter = require('./routes/user.router');
const expensesRouter = require('./routes/expenses.router');

const createServer = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  app.use((req, res) => {
    res.status(404).send('Route not found');
  });

  return app;
};

module.exports = {
  createServer,
};
