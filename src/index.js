'use strict';

const express = require('express');
const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

const app = express();

app.use('/users', express.json(), usersRouter);
app.use('/expenses', express.json(), expensesRouter);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on localhost:3000');
});
