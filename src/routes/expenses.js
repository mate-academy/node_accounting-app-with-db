const express = require('express');

const {
  getExpenses,
  createExpenses,
  getExpensesById,
  deleteExpenses,
  updateExpenses,
} = require('../controllers/expensesController.js');

const router = express.Router();

router.get('/', getExpenses);

router.post('/', createExpenses);

router.get('/:id', getExpensesById);

router.delete('/:id', deleteExpenses);

router.patch('/:id', updateExpenses);

module.exports = router;
