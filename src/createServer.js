'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./router/users.js');
const expensesRouter = require('./router/expenses.js');

const app = express();

function createServer() {
  return app;
}

app.use(cors());
app.use('/users', usersRouter);
app.use('/expenses', expensesRouter);

module.exports = {
  createServer,
};
