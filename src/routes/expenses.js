'use strict';

const expensesController = require('../controllers/expenses');
const express = require('express');

const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:expenseId', expensesController.getOne);

router.post('/', expensesController.add);
router.patch('/:expenseId', expensesController.update);
router.delete('/:expenseId', expensesController.remove);

module.exports = {
  router,
};
