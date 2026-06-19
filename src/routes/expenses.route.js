const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const router = express.Router();

router.get('/', expensesController.getAllExpenses);
router.get('/:id', expensesController.getExpense);
router.post('/', expensesController.createExpense);
router.delete('/:id', expensesController.deleteExpense);
router.patch('/:id', expensesController.updateExpense);

module.exports = router;
