'use strict';

const express = require('express');
const expensesRouter = express.Router();

const expensesController = require('../controllers/expensesController');

expensesRouter.get('/', expensesController.getAll);
expensesRouter.get('/:expenseId', expensesController.getOne);

expensesRouter.post('/', expensesController.create);

expensesRouter.delete('/:expenseId', expensesController.remove);

expensesRouter.patch('/:expenseId', expensesController.update);

module.exports = expensesRouter;
