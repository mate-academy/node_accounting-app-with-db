'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:expenseId', expensesController.getOne);
router.post('/', express.json(), expensesController.add);
router.delete('/:expenseId', expensesController.remove);
router.patch('/:expenseId', express.json(), expensesController.update);

module.exports = {
  router,
};
