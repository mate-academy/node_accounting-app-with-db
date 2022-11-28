'use strict';

const express = require('express');
const expensesController = require('../controllers/expense.js');

const router = express.Router();

router.get('/', expensesController.getAll);

router.get('/:expenseId', expensesController.getOne);

router.post('/', expensesController.create);

router.delete('/:expenseId', expensesController.remove);

router.patch('/:expenseId', expensesController.modify);

exports.expenseRouter = router;
