'use strict';

const express = require('express');
const {
  getMany: getManyExpenses,
  getOne: getOneExpense,
  create: createExpense,
  remove: removeExpense,
  update: updateExpense,
} = require('../controllers/expenses');

const router = express.Router();

router.get('/', getManyExpenses);
router.get('/:expenseId', getOneExpense);
router.post('/', createExpense);
router.delete('/:expenseId', removeExpense);
router.patch('/:expenseId', updateExpense);

module.exports = { router };
