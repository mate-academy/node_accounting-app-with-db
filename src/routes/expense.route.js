const express = require('express');
const expenseController = require('../controllers/expense.controller.js');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.get);
expenseRouter.get('/:id', expenseController.getOne);
expenseRouter.post('/', expenseController.create);
expenseRouter.patch('/:id', expenseController.update);
expenseRouter.delete('/:id', expenseController.remove);
module.exports = expenseRouter;
