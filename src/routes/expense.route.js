const express = require('express');
const expenseController = require('../controllers/expense.controller.js');
const router = express.Router();

router.get('/', expenseController.getExpenses);

router.get('/:id', expenseController.getOneExpense);

router.post('/', expenseController.createExpense);

router.patch('/:id', expenseController.updateExpense);

router.delete('/:id', expenseController.removeExpense);

module.exports = router;
