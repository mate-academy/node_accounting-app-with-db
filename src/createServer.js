'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const expenseRouter = require('./routes/expense.routes');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

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
