const router = require('express').Router();
const expenses = require('../controllers/expenses.controller');

router.get('/', expenses.getExpenses);
router.post('/', expenses.createExpense);
router.get('/:id', expenses.getExpenseById);
router.delete('/:id', expenses.deleteExpenseById);
router.patch('/:id', expenses.updateExpenseById);

module.exports = router;
