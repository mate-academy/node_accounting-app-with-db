'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');

const userService = require('./services/user.service');
const expenseService = require('./services/expense.service');
const expenseRouter = require('./routes/expense.route');

function createServer() {
  userService.reset();
  expenseService.reset();

  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);

  app.use('/expenses', express.json(), expenseRouter);

  return app;
};

module.exports = {
  createServer,
};

// app.listen(5040, () => {
//   console.log('server i s rinning');
// });
