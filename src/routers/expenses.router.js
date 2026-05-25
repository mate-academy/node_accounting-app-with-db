const { Router } = require('express');
const {
  create: createExpense,
  deleteOnce: deleteOnceExpense,
  getAll: getAllExpenses,
  getOne: getOneExpense,
  patch: patchExpense,
} = require('../controllers/expenses.controller.js');

const router = Router();

router.post('/', createExpense);
router.get('/', getAllExpenses);
router.get('/:id', getOneExpense);
router.delete('/:id', deleteOnceExpense);
router.patch('/:id', patchExpense);

module.exports = { router };
