'use strict';

const express = require('express');
const { userRouter } = require('./routes/users');
const { expenseRouter } = require('./routes/expenses');

const server = express();

server.use('/users', userRouter);
server.use('/expenses', expenseRouter);

server.listen(3000);
