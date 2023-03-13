'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');
const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getAll);

expenseRouter.get('/:expenseId', expenseController.getOne);

expenseRouter.post('/', expenseController.add);

expenseRouter.patch('/:expenseId', expenseController.update);

expenseRouter.delete('/:expenseId', expenseController.remove);

module.exports = expenseRouter;
