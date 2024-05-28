const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');

router.get('/', expenseController.getAll);
router.get('/:id', expenseController.getById);
router.post('/', expenseController.postExpense);
router.delete('/:id', expenseController.deleteExpense);
router.patch('/:id', expenseController.updateExpense);

module.exports = {
  router,
};
