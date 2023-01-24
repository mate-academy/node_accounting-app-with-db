/* eslint-disable no-console */
'use strict';

const express = require('express');
const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

const app = express();

app.use('/users', usersRouter);
app.use('/expenses', expensesRouter);

app.listen(5748, () => {
  console.log('server is running');
});
