const express = require('express');
const expensesRouter = express.Router();

const expenseController = require('../controllers/expenses.controller.js');

expensesRouter.use(express.json());
expensesRouter.get('/', expenseController.getAll);
expensesRouter.post('/', expenseController.create);
expensesRouter.get('/:id', expenseController.getById);
expensesRouter.delete('/:id', expenseController.remove);
expensesRouter.patch('/:id', expenseController.update);

module.exports = expensesRouter;
