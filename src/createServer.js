'use strict';

const express = require('express');
const cors = require('cors');
const { usersRoute } = require('./routers/usersRoute.js');
const { expensesRoute } = require('./routers/expensesRoute.js');

function createServer() {
  const app = express();

  app.use(cors());

  app.use(express.json());
  app.use('/users', usersRoute);
  app.use('/expenses', expensesRoute);

  return app;
}

module.exports = {
  createServer,
};
