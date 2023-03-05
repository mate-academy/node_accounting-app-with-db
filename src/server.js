'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

const server = express();

server.use(cors());
server.use('/users', usersRouter);
server.use('/expenses', expensesRouter);

module.exports = {
  server,
};
