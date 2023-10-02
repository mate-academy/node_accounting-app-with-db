/* eslint-disable no-console */
'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  app.listen(3000, () => {
    console.log('Server on port 3000');
  });

  return app;
}

createServer();

module.exports = {
  createServer,
};
