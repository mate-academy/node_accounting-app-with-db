'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');
const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getAll);
expenseRouter.get('/:expenseId', expenseController.getOne);
expenseRouter.post('/', expenseController.add);
expenseRouter.delete('/:expenseId', expenseController.remove);
expenseRouter.patch('/:expenseId', expenseController.update);

module.exports = { expenseRouter };
