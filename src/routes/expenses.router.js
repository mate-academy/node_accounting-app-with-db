'use strict';

const expensesController = require('../controllers/expenses.controller.js');
const { Router } = require('express');

const expensesRouter = Router();

expensesRouter.get('/:id', expensesController.getOneExp);
expensesRouter.get('/', expensesController.getAllExp);
expensesRouter.post('/', expensesController.addExp);
expensesRouter.delete('/:id', expensesController.deleteExp);
expensesRouter.patch('/:id', expensesController.editExp);

module.exports = { expensesRouter };
