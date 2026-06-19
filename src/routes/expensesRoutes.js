const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');

router.get('/', expensesController.getExpenses);
router.post('/', expensesController.createExpense);
router.get('/:id', expensesController.getExpense);
router.delete('/:id', expensesController.deleteExpense);
router.patch('/:id', expensesController.updateExpense);

module.exports = router;
