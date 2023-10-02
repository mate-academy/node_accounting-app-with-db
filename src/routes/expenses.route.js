'use strict';

const express = require('express');
const expensesRouter = express.Router();
const expensesControllers = require('../controllers/expenses.controllers');

expensesRouter.get('/', expensesControllers.get);
expensesRouter.get('/:id', expensesControllers.getOne);
expensesRouter.post('/', expensesControllers.create);
expensesRouter.patch('/:id', expensesControllers.update);
expensesRouter.delete('/:id', expensesControllers.remove);

module.exports = { expensesRouter };
