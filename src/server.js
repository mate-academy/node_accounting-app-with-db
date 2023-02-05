/* eslint-disable no-console */
'use strict';

const express = require('express');

const userRouter = require('./routers/users');
const expensesRouter = require('./routers/expenses');

const server = express();

server.use('/users', userRouter);
server.use('/expenses', expensesRouter);

server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
