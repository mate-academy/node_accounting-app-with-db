/* eslint-disable prettier/prettier */

'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./entity/user/user.router');
const expensesRouter = require('./entity/expense/expense.router');

require('./models/associations');

const createServer = () => {
  const app = express();

  app.use(
    cors({
      origin: '*',
      methods: 'GET, POST, PUT, DELETE',
      allowedHeaders: 'Content-Type',
      credentials: true,
    }),
    express.json(),
  );

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
