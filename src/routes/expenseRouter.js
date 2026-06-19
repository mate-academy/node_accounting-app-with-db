'use strict';

const { Router } = require('express');
const expenseController = require('../controllers/expenseController');

const router = Router();

router.get('/', expenseController.getExpenses);
router.get('/:id', expenseController.getExpense);
router.post('/', expenseController.createExpense);
router.patch('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
