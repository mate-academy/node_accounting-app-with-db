'use strict';

const express = require('express');
const {
  getAllUs,
  getByIdUser,
  addNewUser,
  deleteUser,
  updateUserById,
} = require('./controllers/users.controller');

const {
  getAllEx,
  getByIdExpense,
  addNewExpense,
  deleteExpense,
  updateExpenseById,
} = require('./controllers/expenses.controller');

const createServer = () => {
  // your code goes here
  const app = express(); // ініціалізація серверу

  // отримати всі users з масиву
  app.get('/users', getAllUs);

  // отримати конкретного user з масиву
  app.get('/users/:id', getByIdUser);

  // додати новий user до масиву
  app.post('/users', express.json(), addNewUser);

  // видалити user з масиву за id
  app.delete('/users/:id', deleteUser);

  // відредагувати user з масиву
  app.patch('/users/:id', express.json(), updateUserById);

  // отримати всі expenses з масиву
  app.get('/expenses', getAllEx);

  // отримати конкретний expense з масиву
  app.get('/expenses/:id', getByIdExpense);

  // додати новий expense до масиву
  app.post('/expenses', express.json(), addNewExpense);

  // видалити expense з масиву
  app.delete('/expenses/:id', deleteExpense);

  // відредагувати expense з масиву
  app.patch('/expenses/:id', express.json(), updateExpenseById);

  return app;
};

module.exports = {
  createServer,
};

// {
//   "userId": 0,
//   "spentAt": "2024-10-20T11:49:45.942Z",
//   "title": "string",
//   "amount": 0,
//   "category": "string",
//   "note": "string"
// }
