const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { findExpense } = require('../middlewares/findExpense');

router.get('/expenses', expenseController.getExpenses);
router.get('/expenses/:id', findExpense, expenseController.getExpenseById);
router.post('/expenses', expenseController.createExpense);
router.delete('/expenses/:id', findExpense, expenseController.deleteExpense);
router.patch('/expenses/:id', findExpense, expenseController.updateExpense);
module.exports = router;
