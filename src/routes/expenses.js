const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.get('/', expenseController.getAllExpenses);
router.post('/', expenseController.createExpense);
router.get('/:id', expenseController.getExpenseById);
router.patch('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
