'use strict';

const express = require('express');
const cors = require('cors');

// const { resetExpenses } = require('./services/expenses.service.js');
// const { resetUsers } = require('./services/users.service.js');

const { router: expenseRouter } = require('./routes/expenses.route.js');
const { router: usersRouter } = require('./routes/users.route.js');

const createServer = () => {
  const app = express();

  // resetUsers();
  // resetExpenses();

  app.use(cors());
  app.use(express.json());
  app.use('/expenses', expenseRouter);
  app.use('/users', usersRouter);

  return app;
};

module.exports = {
  createServer,
};
