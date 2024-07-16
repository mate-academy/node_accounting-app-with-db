'use strict';

const express = require('express');
const {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  postUser,
} = require('./controllers/users-controller.js');
const {
  getExpenses,
  postExpense,
  getExpense,
  deleteExpense,
  patchExpense,
} = require('./controllers/expenses-controller.js');

const createServer = () => {
  const app = express();

  // Users
  app.get('/users', express.json(), getUsers);

  app.post('/users', express.json(), postUser);

  app.get('/users/:userId', express.json(), getUser);

  app.delete('/users/:userId', express.json(), deleteUser);

  app.patch('/users/:userId', express.json(), updateUser);

  // Expenses
  app.get('/expenses', express.json(), getExpenses);

  app.post('/expenses', express.json(), postExpense);

  app.get('/expenses/:expenseId', express.json(), getExpense);

  app.delete('/expenses/:expenseId', express.json(), deleteExpense);

  app.patch('/expenses/:expenseId', express.json(), patchExpense);

  return app;
};

module.exports = {
  createServer,
};
