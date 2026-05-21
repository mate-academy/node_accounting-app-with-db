'use strict';

const expenses = require('./controllers/expenses');
const users = require('./controllers/users');
const express = require('express');

const createServer = () => {
  // your code goes here
  const app = express();

  app.get('/', (req, res) => {
    res.send('test');
  });

  // users

  app.get('/users', (req, res) => {
    return users.getUsers();
  });

  app.get('/users/:id', (req, res) => {
    return users.getUserById();
  });

  app.post('/users/', (req, res) => {
    return users.createUser();
  });

  app.patch('/users/:id', (req, res) => {
    return users.updateUser();
  });

  app.delete('/users/:id', (req, res) => {
    return users.deleteUser();
  });

  // expenses

  app.get('/expenses', (req, res) => {
    return expenses.getExpenses();
  });

  app.get('/expenses/:id', (req, res) => {
    return expenses.getExpenseById();
  });

  app.post('/expenses/', (req, res) => {
    return expenses.createExpense();
  });

  app.patch('/expenses/:id', (req, res) => {
    return expenses.updateExpense();
  });

  app.delete('/expenses/:id', (req, res) => {
    return expenses.deleteExpense();
  });
};

module.exports = {
  createServer,
};
