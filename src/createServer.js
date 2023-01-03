'use strict';

const express = require('express');

const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('server is running on localhost:3000');
  });

  return app;
}

createServer();

module.exports = {
  createServer,
};
