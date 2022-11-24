'use strict';

const express = require('express');
const expensesControllers = require('../controllers/expenses');

const router = express.Router();

router.get('/', expensesControllers.getAll);
router.get('/:expenseId', expensesControllers.getOne);

router.post('/', expensesControllers.add);

router.delete('/:expenseId', expensesControllers.remove);

router.patch('/:expenseId', expensesControllers.update);

module.exports = {
  router,
};
