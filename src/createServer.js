'use strict';

const express = require('express');
const { router: usersRouter } = require('./routes/users');
const { router: expenseRouter } = require('./routes/expenses');

const app = express();

app.use('/users', express.json(), usersRouter);
app.use('/expenses', express.json(), expenseRouter);

function createServer() {
  return app;
}

module.exports = {
  createServer,
};
