'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.js');
const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:expenseId', expensesController.getExpense);

router.post('/', expensesController.addExpense);

router.patch('/:expenseId', expensesController.updateExpense,
);

router.delete('/:expenseId', expensesController.removeExpense);

module.exports = router;
