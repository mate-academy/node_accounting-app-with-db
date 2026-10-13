const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.post('/', expensesController.create);

expensesRouter.get('/', expensesController.getAll);

expensesRouter.get('/:id', expensesController.get);

expensesRouter.patch('/:id', expensesController.patch);

expensesRouter.delete('/:id', expensesController.remove);

module.exports = { expensesRouter };
