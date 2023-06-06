'use strict';

const express = require('express');
const {
  getAll,
  getOne,
  add,
  remove,
  update,
} = require('../controllers/expenses.js');

const expensesRouter = express.Router();

expensesRouter.get('/', getAll);
expensesRouter.get('/:expenseId', getOne);
expensesRouter.post('/', add);
expensesRouter.delete('/:expenseId', remove);
expensesRouter.patch('/:expenseId', update);

module.exports = {
  expensesRouter,
};
