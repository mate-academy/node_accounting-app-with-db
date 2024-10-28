const express = require('express');
const { validateFields } = require('./../middlewares/validateFields');
const { validateExpense } = require('./../middlewares/validadeExpense');
const expenseController = require('./../controllers/expense.controller');
const router = express.Router();

router.get('/', expenseController.get);

router.get('/:id', validateExpense(), expenseController.getOne);

router.post(
  '/',
  validateFields(['userId', 'spentAt', 'title', 'amount']),
  expenseController.create,
);

router.delete('/:id', validateExpense(), expenseController.remove);

router.patch('/:id', validateExpense(), expenseController.update);

module.exports = { router };
