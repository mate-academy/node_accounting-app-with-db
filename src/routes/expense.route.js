'use strict';

const express = require('express');
const expenseController = require('./../controllers/expense.controller');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.get);
expenseRouter.get('/:id', expenseController.getOne);
expenseRouter.post('/', expenseController.post);
expenseRouter.patch('/:id', expenseController.patch);
expenseRouter.delete('/:id', expenseController.delete);

module.exports = expenseRouter;
