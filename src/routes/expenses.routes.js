'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('../controller/expenses.controller.js');

router.get('/', expensesController.getAll);
router.get('/:id', expensesController.getOne);
router.post('/', expensesController.addExpense);
router.delete('/:id', expensesController.delExpense);
router.patch('/:id', expensesController.editExpense);

module.exports = router;
