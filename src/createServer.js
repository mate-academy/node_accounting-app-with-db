'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const expenseRouter = require('./routes/expense.routes');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  app.use((req, res) => {
    res.sendStatus(404);
  });

  return app;
};

module.exports = {
  createServer,
};
