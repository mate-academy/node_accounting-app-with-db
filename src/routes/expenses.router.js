const { Router } = require('express');
const expensesController = require('../controllers/expenses.controller');
const { asyncHandler } = require('../utils');

const expensesRouter = Router();

expensesRouter.get('/', asyncHandler(expensesController.getAll));
expensesRouter.post('/', asyncHandler(expensesController.create));
expensesRouter.get('/:id', asyncHandler(expensesController.getOne));
expensesRouter.delete('/:id', asyncHandler(expensesController.deleteOne));
expensesRouter.patch('/:id', asyncHandler(expensesController.update));

module.exports = { expensesRouter };
