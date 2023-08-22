'use strict';

const express = require('express');
const cors = require('cors');

const { usersRouter } = require('./routes/usersRouter');
const { expenseRouter } = require('./routes/expenseRouter');

function creatServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = { creatServer };
