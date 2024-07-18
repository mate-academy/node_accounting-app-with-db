'use strict';

const express = require('express');
const cors = require('cors');
const expensesControllers = require('./controllers/expenses.controller');
const userControllers = require('./controllers/users.controller');
const expensesService = require('./services/expenses.services');
const usersService = require('./services/users.services');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.get('/expenses', expensesControllers.getAll);
  app.post('/expenses', expensesControllers.addExpense);
  app.get('/expenses/:id', expensesControllers.getExpense);
  app.delete('/expenses/:id', expensesControllers.removeExpense);
  app.patch('/expenses/:id', expensesControllers.updateExpense);
  app.get('/users', userControllers.getAll);
  app.post('/users', userControllers.addUser);
  app.get('/users/:id', userControllers.getUser);
  app.delete('/users/:id', userControllers.removeUser);
  app.patch('/users/:id', userControllers.changeUser);
  expensesService.deleteExpenses();
  usersService.deleteUsers();

  return app;
};

module.exports = {
  createServer,
};
