const express = require('express');
const expenseController = require('../controllers/expenses.controller');

const router = express.Router();

router.get('/', expenseController.getExpenses);
router.post('/', express.json(), expenseController.addExpense);
router.get('/:id', expenseController.getOneExpense);
router.delete('/:id', expenseController.deleteExpense);
router.patch('/:id', express.json(), expenseController.updateExpense);

module.exports = router;
