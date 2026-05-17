const express = require('express');
const expensesController = require('../controllers/expense.controller');

const router = express.Router();

router.get('/', expensesController.getAllExpense);
router.post('/', expensesController.createExpense);
router.get('/:id', expensesController.getExpenseById);
router.patch('/:id', expensesController.updateExpense);
router.delete('/:id', expensesController.removeExpense);

module.exports = { router };
