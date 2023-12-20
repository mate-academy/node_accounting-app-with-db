'use strict';

const express = require('express');
const app = express();
const { usersRouter } = require('./routes/users.routes');
const { expensesRouter } = require('./routes/expenses.routes');

function createServer() {
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

createServer().listen(3006, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on localhost : 3006');
});

module.exports = {
  createServer,
};
