'use strict';

const express = require('express');
const usersRouter = require('./routes/users.router');
const expensesRouter = require('./routes/expenses.router');

// Функція для очищення масивів
function resetData(app) {
  app.locals.users = [];
  app.locals.expenses = [];
}

function createServer() {
  const app = express();

  app.use(express.json());

  // Ініціалізуємо масиви
  resetData(app);

  // Роутери
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
