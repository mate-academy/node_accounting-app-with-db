'use strict';

const express = require('express');
const expenseController = require('../controllers/expense.controllers');
const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getAllExp);
expenseRouter.get('/:id', expenseController.getOneExp);
expenseRouter.post('/', expenseController.createExp);
expenseRouter.patch('/:id', expenseController.updateExp);
expenseRouter.delete('/:id', expenseController.removeExp);

module.exports = { expenseRouter };
