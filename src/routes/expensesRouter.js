const express = require('express');
const expensesController = require('../controllers/expensesController.js');
const expenseRouter = express.Router();

expenseRouter.get('/', expensesController.get);

expenseRouter.get('/:id', expensesController.getOne);

expenseRouter.post('/', expensesController.create);

expenseRouter.delete('/:id', expensesController.remove);

expenseRouter.patch('/:id', expensesController.update);

module.exports = { expenseRouter };
