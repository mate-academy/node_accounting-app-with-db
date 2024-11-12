const express = require('express');
const { checkRequiredFields } = require('../middlewares/checkRequiredFields');
const expenseController = require('../controllers/expensesController');
const { checkIfExists } = require('../middlewares/checkIfExist');
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
