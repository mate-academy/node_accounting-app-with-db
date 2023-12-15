'use strict';

const express = require('express');
const {
  getAllExpenses,
  createNewExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('../controllers/expensesController');
const { validateId } = require('../controllers/userController');

const expensesRoute = express.Router();

expensesRoute.use('/:id', validateId);

expensesRoute
  .get('/', getAllExpenses)
  .post('/', createNewExpense)
  .get('/:id', getExpense)
  .delete('/:id', deleteExpense)
  .patch('/:id', updateExpense);

module.exports = {
  expensesRoute,
};
