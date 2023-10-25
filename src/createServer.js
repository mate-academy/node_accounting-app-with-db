'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./users/users.router');
const { expensesService } = require('./expenses/expenses.service');
const { expensesRouter } = require('./expenses/expenses.router');

function createServer() {
  const server = express();
  const corsOptions = {
    origin: 'http://localhost:3001', // Określenie dozwolonej domeny źródła
    credentials: true, // Włącz obsługę cookies i nagłówków autoryzacyjnych
  };

  server.use(cors(corsOptions));

  expensesService.clearExpenses();

  server.use('/users', express.json(), usersRouter);
  server.use('/expenses', express.json(), expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
