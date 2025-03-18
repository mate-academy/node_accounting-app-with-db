'use strict';

const express = require('express');
const { userRoute } = require('./routes/userRoute');
const { expenseRoute } = require('./routes/expenseRoute');

const createServer = () => {
  // your code goes here
  const app = express();

  app.use('/users', express.json(), userRoute);
  app.use('/expenses', express.json(), expenseRoute);

  return app;
};

module.exports = {
  createServer,
};
