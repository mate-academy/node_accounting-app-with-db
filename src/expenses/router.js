'use strict';

const express = require('express');
const expensesControllers = require('./controllers');

const router = new express.Router();

router.get('/', expensesControllers.getExpenses);

router.get('/:id', expensesControllers.getExpense);

router.post('/', expensesControllers.createExpense);

router.delete('/:id', expensesControllers.deleteExpense);

router.patch('/:id', expensesControllers.updateExpense);

module.exports.expensesRouter = router;
