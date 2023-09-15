'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users');
const { expensesRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

createServer().listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on localhost:3000');
});
