const express = require('express');
const {
  getAllExpenses,
  createExpense,
  getOneExpense,
  updateExpense,
  removeExpense,
} = require('../controllers/expense.controller');

const router = express.Router();

router.get('/', getAllExpenses);
router.get('/:id', getOneExpense);
router.post('/', createExpense);
router.patch('/:id', updateExpense);
router.delete('/:id', removeExpense);

module.exports = { router };
