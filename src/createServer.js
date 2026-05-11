/* eslint-disable comma-dangle */
'use strict';

const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const expenseRoute = require('./routes/expenseRoute');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', userRoute);
  app.use('/expenses', expenseRoute);

  return app;
}

module.exports = {
  createServer,
};
