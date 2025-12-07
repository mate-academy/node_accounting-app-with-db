'use strict';

const express = require('express');
const cors = require('cors');
const { router: userRouter } = require('./routes/user.route');
const { router: expensesRouter } = require('./routes/expenses.route');

const createServer = () => {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  /* Creating another API endpoint for category wasn't required in
  the task description. Please refer to the README file, so I won't do this. */

  return app;
};

module.exports = {
  createServer,
};
