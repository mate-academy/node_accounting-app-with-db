'use strict';

const express = require('express');
const router = express.Router();

const expensesController = require('../controllers/expenses');

router.get('/', expensesController.getAll);

router.post('/', express.json(), expensesController.addOne);

router.get('/:expenseId', expensesController.getOne);

router.delete('/:expenseId', expensesController.deleteOne);

router.patch('/:expenseId', express.json(), expensesController.updateOne);

module.exports = router;
