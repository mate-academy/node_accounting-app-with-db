'use strict';

require('dotenv').config();

const express = require('express');
const { router: expensesRouter } = require('./routes/expenses.router');
const { router: usersRouter } = require('./routes/users.router');

const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || `http://localhost:${PORT}`;

function createServer() {
  const server = express();

  server.use('/users', express.json(), usersRouter);
  server.use('/expenses', express.json(), expensesRouter);

  server.listen(PORT, () => {
    // eslint-disable-next-line
    console.log(`API is running on ${HOST}`);
  });
}

createServer();

module.exports = {
  createServer,
};
