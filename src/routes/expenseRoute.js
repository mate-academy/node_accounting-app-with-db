const express = require('express');
const expenceController = require('../controllers/expenceController.js');

const expenseRoute = express.Router();

expenseRoute.get('/', expenceController.getExpenses);
expenseRoute.get('/:id', expenceController.getOneExpense);
expenseRoute.post('/', expenceController.createExpance);
expenseRoute.patch('/:id', expenceController.updateExpense);
expenseRoute.delete('/:id', expenceController.removeExpense);

module.exports = { expenseRoute };
