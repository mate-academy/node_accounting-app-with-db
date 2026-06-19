'use strict';

const { Router } = require('express');
const expensesController = require('../controllers/expenses.controller');

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.post('/', expensesController.create);
expensesRouter.get('/:id', expensesController.getOne);
expensesRouter.patch('/:id', expensesController.update);
expensesRouter.delete('/:id', expensesController.remove);

module.exports = { expensesRouter };
