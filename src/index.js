'use strict';
require('dotenv').config();

const express = require('express');
const usersRouter = require('./routes/users.router');
const expensesRouter = require('./routes/expenses.router');

const app = express();

app.use(express.json());
app.use('/users', usersRouter);
app.use('/expenses', expensesRouter);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line
  console.log('server is running on localhost:3000');
});
