const express = require('express');
const expenseController = require('../controllers/expense.controller');

const router = express.Router();

router.get('/', expenseController.get);
router.get('/:id', expenseController.getExpense);
router.post('/', expenseController.createExpense);
router.delete('/:id', expenseController.removeExpense);
router.patch('/:id', expenseController.updateExpense);

module.exports = {
  router,
};
