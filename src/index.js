'use strict';

const express = require('express');
const usersRouter = require('./routes/users.router');
const expensesRouter = require('./routes/expenses.router');

const app = express();

app.use('/users', express.json(), usersRouter);
app.use('/expenses', express.json(), expensesRouter);

app.listen('3000', () => {
  // eslint-disable-next-line
  console.log('server is running on localhost:3000');
});
