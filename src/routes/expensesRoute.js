'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController.js');

router.get('/', express.json(), expensesController.getAll);
router.post('/', express.json(), expensesController.add);
router.get('/:expenseId', express.json(), expensesController.getCurrentExpense);
router.delete('/:expenseId', expensesController.remove);
router.patch('/:expenseId', express.json(), expensesController.update);

module.exports = {
  router,
};
