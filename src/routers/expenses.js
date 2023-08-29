'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');
const router = express.Router();

router.post('/', expensesController.create);
router.get('/', expensesController.getAll);
router.get('/:expenseId', expensesController.getById);
router.delete('/:expenseId', expensesController.remove);
router.patch('/:expenseId', expensesController.update);

module.exports = router;
