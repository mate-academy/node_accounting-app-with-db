'use strict';

const { userRouter } = require('./routes/usersRouter.js');
const { expenseRouter } = require('./routes/expensesRouter.js');

const express = require('express');
const cors = require('cors');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
};

module.exports = {
  createServer,
};
