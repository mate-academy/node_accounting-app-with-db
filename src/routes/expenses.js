'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/', express.json(), expensesController.getAll);
router.get('/:expenseId', express.json(), expensesController.getOne);
router.post('/', express.json(), expensesController.create);
router.delete('/:expenseId', express.json(), expensesController.remove);
router.patch('/:expenseId', express.json(), expensesController.update);

module.exports = { router };
