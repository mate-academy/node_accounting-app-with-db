'use strict';

const { Router } = require('express');
const expensesController = require('../controllers/expenses');

const router = Router();

router
  .get('/', expensesController.getAll)
  .get('/:expenseId', expensesController.getById)
  .post('/', expensesController.create)
  .patch('/:expenseId', expensesController.patch)
  .delete('/:expenseId', expensesController.remove);

module.exports = { router };
