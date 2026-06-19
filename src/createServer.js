/* eslint-disable no-console */
'use strict';

const express = require('express');
const expenseService = require('./services/expenseService');
const userService = require('./services/userService');
const { expenseRoute } = require('./routes/expenseRoute');
const { sequelize } = require('./db');
const { userRoute } = require('./routes/userRoute');

const createServer = () => {
  const app = express();

  expenseService.resetExpenses();
  userService.resetUsers();
  console.log('DB clear');

  app.use('/expenses', express.json(), expenseRoute);
  app.use('/users', express.json(), userRoute);

  sequelize
    .sync()
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Error sencing datebase', err));

  return app;
};

module.exports = {
  createServer,
};
