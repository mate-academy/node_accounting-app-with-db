'use strict';

const express = require('express');
const {
  getAllExpenses,
  createNewExpense,
  getExpense,
  deleteExpense,
  updateExpense,
  validateBody,
} = require('../controllers/expensesController');
const { validateId } = require('../utils/helpers');

const expensesRoute = express.Router();

expensesRoute.use('/:id', validateId);

expensesRoute
  .get('/', getAllExpenses)
  .get('/:id', getExpense)
  .post('/', validateBody, createNewExpense)
  .delete('/:id', deleteExpense)
  .patch('/:id', validateBody, updateExpense);

module.exports = {
  expensesRoute,
};
