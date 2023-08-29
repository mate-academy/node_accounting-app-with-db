'use strict';

const express = require('express');
const expensesRouter = express.Router();
const expensesController = require('../controllers/expenses');

expensesRouter.get('/', expensesController.getAll);

expensesRouter.get('/:categoryId', expensesController.getOne);

expensesRouter.post('/', expensesController.addOne);

expensesRouter.patch('/:categoryId', expensesController.update);

expensesRouter.delete('/:categoryId', expensesController.remove);

module.exports = { expensesRouter };
