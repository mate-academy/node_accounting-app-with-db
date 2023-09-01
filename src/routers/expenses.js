'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');
const { validateExpense, validateQueries } = require('../middlewares/expenses');
const router = express.Router();

router.post('/', validateExpense(), expensesController.create);
router.get('/', validateQueries(), expensesController.getAll);
router.get('/:expenseId', expensesController.getById);
router.delete('/:expenseId', expensesController.remove);

router.patch(
  '/:expenseId',
  validateExpense({ required: false }),
  expensesController.update
);

module.exports = router;
