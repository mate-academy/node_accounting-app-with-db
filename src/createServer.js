'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/userRoute');
const { expensesRouter } = require('./routes/expensesRoute');
const { init: userInit } = require('./models/User.model');
const { init: expensesInit } = require('./models/Expense.model');

async function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  await userInit();
  await expensesInit();

  return app;
}

module.exports = {
  createServer,
};
