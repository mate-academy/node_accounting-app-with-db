'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users');
const expenseRouter = require('./routes/expenses');

const server = express();

server.use(cors());
server.use('/users', express.json(), userRouter);
server.use('/expenses', express.json(), expenseRouter);

module.exports = server;
