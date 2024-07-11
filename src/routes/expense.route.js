const express = require('express');
const router = express.Router();
const ExpensesControl = require('../controllers/expense.controller');

router.get('/', ExpensesControl.getExpenses);
router.post('/', ExpensesControl.addExpense);
router.get('/:id', ExpensesControl.getExpense);
router.delete('/:id', ExpensesControl.deleteExpense);
router.patch('/:id', ExpensesControl.updateExpense);

module.exports = router;
