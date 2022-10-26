/* eslint-disable no-shadow */
'use strict';

const express = require('express');
const cors = require('cors');
const { createUsers } = require('./router/users');
const { createExpense } = require('./router/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  createUsers(app);
  createExpense(app);

  return app;
}

module.exports = {
  createServer,
};
