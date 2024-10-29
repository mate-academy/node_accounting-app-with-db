const express = require('express');
const { checkRequiredFields } = require('../middlewares/checkRequiredFields');
const expenseController = require('./../controllers/expense.controller');
const { checkIfExists } = require('../middlewares/checkIfExists');
const router = express.Router();

router.get('/', expenseController.get);

router.get('/:id', checkIfExists('expense'), expenseController.getOne);

router.post(
  '/',
  checkRequiredFields(['userId', 'spentAt', 'title', 'amount']),
  expenseController.create,
);

router.delete('/:id', checkIfExists('expense'), expenseController.remove);

router.patch('/:id', checkIfExists('expense'), expenseController.update);

module.exports = { router };
