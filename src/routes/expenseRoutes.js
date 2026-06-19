'use strict';

const express = require('express');
const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');

const router = express.Router();

router.get('/', getAllExpenses); // GET /api/expenses
router.get('/:id', getExpenseById); // GET /api/expenses/:id
router.post('/', createExpense); // POST /api/expenses
router.put('/:id', updateExpense); // PUT /api/expenses/:id (full update)
router.patch('/:id', updateExpense); // PATCH /api/expenses/:id (partial update)
router.delete('/:id', deleteExpense); // DELETE /api/expenses/:id

module.exports = router;
