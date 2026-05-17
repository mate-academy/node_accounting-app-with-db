'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/userRoute');
const { expensesRouter } = require('./routes/expensesRoute');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
