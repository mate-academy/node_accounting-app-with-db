'use strict';

const express = require('express');
const expensesController = require('../controllers/expensesController');

const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:expenseId', expensesController.getById);
router.post('/', expensesController.add);
router.patch('/:expenseId', expensesController.update);
router.delete('/:expenseId', expensesController.remove);

module.exports = {
  router,
};
