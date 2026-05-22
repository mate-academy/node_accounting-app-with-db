'use strict';

const expenses = require('./controllers/expenses');
const users = require('./controllers/users');
const express = require('express');

const createServer = () => {
  // your code goes here
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('test');
  });

  // users

  app.get('/users', users.getUsers);
  app.get('/users/:id', users.getUserById);
  app.post('/users', users.createUser);
  app.patch('/users/:id', users.updateUser);
  app.delete('/users/:id', users.deleteUser);

  // expenses

  app.get('/expenses', expenses.getExpenses);
  app.get('/expenses/:id', expenses.getExpenseById);
  app.post('/expenses', expenses.createExpense);
  app.patch('/expenses/:id', expenses.updateExpense);
  app.delete('/expenses/:id', expenses.deleteExpense);

  return app;
};

module.exports = {
  createServer,
};
