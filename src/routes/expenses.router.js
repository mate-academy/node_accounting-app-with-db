const router = require('express').Router();
const expenseController = require('../controllers/expenses.controller');

router.get('/', expenseController.getAll);
router.get('/:id', expenseController.getOne);
router.post('/', expenseController.createExpense);
router.patch('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.removeExpense);

module.exports = router;
