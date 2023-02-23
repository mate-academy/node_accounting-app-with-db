'use strict';

const express = require('express');
const expensesController = require('../controllers/expensesController');

const expenseRouter = express.Router();

expenseRouter.get('/', expensesController.getAll);

expenseRouter.get('/:expenseId', expensesController.getById);

expenseRouter.post('/', express.json(), expensesController.create);

expenseRouter.delete('/:expenseId', expensesController.remove);

expenseRouter.patch('/:expenseId', express.json(), expensesController.update);

module.exports = { expenseRouter };
