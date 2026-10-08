'use strict';

const {
  createExpenseController,
  getExpenses,
  getExpenseById,
  patchExpenseById,
  deleteExpenseById,
} = require('../controllers/expensesControllers');

const express = require('express');
const expensesRoutes = express.Router();

expensesRoutes.post('/', createExpenseController);
expensesRoutes.get('/', getExpenses);
expensesRoutes.get('/:id', getExpenseById);
expensesRoutes.patch('/:id', patchExpenseById);
expensesRoutes.delete('/:id', deleteExpenseById);

module.exports = {
  expensesRoutes,
};
