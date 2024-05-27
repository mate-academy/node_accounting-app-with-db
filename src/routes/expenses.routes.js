const express = require('express');
const expensesContr = require('../controllers/expenses.contr');
const expensesRouter = express.Router();

expensesRouter.get('/', expensesContr.getAllExpenses);
expensesRouter.get('/:id', expensesContr.getExpenseById);
expensesRouter.post('/', expensesContr.getCreateExpense);
expensesRouter.delete('/:id', expensesContr.getDeleteExpense);
expensesRouter.patch('/:id', expensesContr.getUpdateExpense);

module.exports = expensesRouter;
//
