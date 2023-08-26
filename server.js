'use strict';

const express = require('express');
const cors = require('cors');

const { usersRouter } = require('./src/routes/users');
const { expensesRouter } = require('./src/routes/expenses');

require('dotenv').config();

const server = express();
const PORT = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());

server.use('/users', usersRouter);
server.use('/expenses', expensesRouter);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});
