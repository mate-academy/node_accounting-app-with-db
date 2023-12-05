'use strict';

const express = require('express');
const expenseController = require('../controllers/expense.controller');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getExpences);

expenseRouter.post('/', expenseController.create);

expenseRouter.get('/:id', expenseController.getOne);

expenseRouter.patch('/:id', expenseController.update);

expenseRouter.delete('/:id', expenseController.remove);

module.exports = expenseRouter;
