'use strict';

const expensesControllers = require('../controllers/expenses');
const express = require('express');

const router = express.Router();

router.post('/', expensesControllers.add);

router.get('/', expensesControllers.getAll);

router.get('/:expenseId', expensesControllers.getOne);

router.patch(
  '/:expenseId',
  expensesControllers.update
);

router.delete(
  '/:expenseId',
  expensesControllers.remove
);

module.exports = {
  router,
};
