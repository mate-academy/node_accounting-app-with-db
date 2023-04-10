'use strict';

const express = require('express');
const cors = require('cors');
const { router: usersRouter } = require('./routes/users.js');
const { initUsers } = require('./controllers/users.js');
const { router: expensesRouter } = require('./routes/expenses.js');
const { initExpenses } = require('./controllers/expenses.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  initUsers();
  initExpenses();

  return app;
}

module.exports = {
  createServer,
};
