'use strict';
const express = require('express');
const {
  createUser,
  getUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  getExpenses,
  getSingleExpense,
  createExpense,
  deleteExpense,
  updateExpense,
} = require('./controller/controller.js');

const cors = require('cors');

function createServer() {
  
  const app = express();

  app.use(express.json());
  app.use(cors())

  app.get('/users', getUsers);

  app.get('/users/:id', getSingleUser);

  app.post('/users', createUser);

  app.delete('/users/:id', deleteUser);

  app.patch('/users/:id', updateUser);

  app.get('/expenses', getExpenses);

  app.get('/expenses/:id', getSingleExpense);

  app.post('/expenses', createExpense);

  app.delete('/expenses/:id', deleteExpense);

  app.patch('/expenses/:id', updateExpense);

  return app;
}

module.exports = {
  createServer,
};
