'use strict';

const express = require('express');
const expenseControllers = require('../controllers/expenses');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseControllers.getAll);
expenseRouter.get('/:expenseId', expenseControllers.getOne);
expenseRouter.post('/', expenseControllers.create);
expenseRouter.patch('/:expenseId', expenseControllers.update);
expenseRouter.delete('/:expenseId', expenseControllers.remove);

module.exports = expenseRouter;
