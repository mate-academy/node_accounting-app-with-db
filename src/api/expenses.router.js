const express = require('express');
const expensesController = require('../controllers/expenses.controller');
const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.post('/', expensesController.create);
expensesRouter.get('/:id', expensesController.getById);
expensesRouter.delete('/:id', expensesController.deleteById);
expensesRouter.patch('/:id', expensesController.update);

module.exports = expensesRouter;
