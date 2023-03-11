'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses.js');

const router = express.Router();

router.get('/', expenseController.getAll);

router.get('/:expensesId', expenseController.getOne);

router.post('/', expenseController.add);

router.patch('/:expensesId', expenseController.update);

router.delete('/:expensesId', expenseController.remove);

module.exports = { router };
