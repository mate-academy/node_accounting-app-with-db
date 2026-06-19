/* 'use strict';

const express = require('express');

const {
  getExpensesById,
  patchExpensesById,
  deleteExpensesById,
  createExpense,
} = require('../controlers/expenses.controller');

const router = express.Router();

router.get('/', async (req, res) => {
  const expenses = req.app.locals.expenses;
  const { userId, from, to, categories } = req.query;
  let result = expenses;

  if (userId) {
    result = result.filter((e) => e.userId === Number(userId));
  }

  if (from && to) {
    result = result.filter(
      (e) =>
        new Date(e.spentAt) >= new Date(from) &&
        new Date(e.spentAt) <= new Date(to),
    );
  }

  if (categories) {
    const cats = categories.split(',');

    result = result.filter((e) => cats.includes(e.category));
  }

  res.json(result);
});

router.post('/', async (req, res) => {
  const { users, expenses } = req.app.locals;
  const { userId, title, amount, category, date, note } = req.body;

  if (!userId || !title || !amount || !category || !date) {
    return res.status(400).send('Missing required fields');
  }

  const userExists = users.some((u) => u.id === userId);

  if (!userExists) {
    return res.status(400).send('User not found');
  }

  const newExpense = {
    id: req.app.locals.nextExpenseId++,
    userId,
    title,
    amount,
    category,
    date,
    note: note || '',
  };

  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

router.post('/expenses', createExpense);
router.get('/:id', getExpensesById);
router.patch('/:id', patchExpensesById);
router.delete('/:id', deleteExpensesById);

module.exports = router; */

'use strict';

const express = require('express');

const {
  getExpensesById,
  patchExpensesById,
  deleteExpensesById,
  createExpense,
  getExpenses,
} = require('../controllers/expenses.controller');

const router = express.Router();

router.get('/', getExpenses);
router.get('/:id', getExpensesById);
router.post('/', createExpense);
router.patch('/:id', patchExpensesById);
router.delete('/:id', deleteExpensesById);

module.exports = router;
