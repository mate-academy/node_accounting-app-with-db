'use strict';

const express = require('express');
const router = express.Router();
const { expensesController } = require('../controllers/expenses');

router.get('/', expensesController.getAll);
router.get('/:expenseId', expensesController.getOne);
router.post('/', expensesController.add);
router.delete('/:expenseId', expensesController.remove);
router.patch('/:expenseId', expensesController.update);

module.exports = router;
