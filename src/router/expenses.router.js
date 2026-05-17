const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const router = express.Router();

router.get('/', expensesController.getAllExpenses);
router.get('/:expId', expensesController.getExpense);
router.post('/', expensesController.createExpense);
router.delete('/:expId', expensesController.removeExpense);
router.patch('/:expId', expensesController.updateExpense);

module.exports = router;
