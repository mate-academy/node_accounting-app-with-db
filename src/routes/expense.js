'use strict';

const express = require('express');
const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/', expenseController.getFiltered);
router.post('/', expenseController.add);
router.get('/:expenseId', expenseController.getOne);
router.delete('/:expenseId', expenseController.removeExpense);
router.patch('/:expenseId', expenseController.updateExpense);

module.exports = {
  expenseRouter: router,
};
