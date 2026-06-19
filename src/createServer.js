'use strict';

const express = require('express');
const { userRoute } = require('./routes/userRoute.js');
const { expenseRoute } = require('./routes/expenseRoute.js');

const createServer = () => {
  const app = express();

  app.use('/users', express.json(), userRoute);
  app.use('/expenses', express.json(), expenseRoute);

  return app;
};

module.exports = {
  createServer,
};
