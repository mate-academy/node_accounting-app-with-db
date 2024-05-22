const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:id', expensesController.getById);
router.post('/', expensesController.createExpenses);
router.patch('/:id', expensesController.updateExpenses);
router.delete('/:id', expensesController.removeExpenses);

module.exports = {
  router,
};
