'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);

expensesRouter.get('/:id', expensesController.getById);

expensesRouter.post('/', expensesController.post);

expensesRouter.patch('/:id', expensesController.update);

expensesRouter.delete('/:id', expensesController.deleteById);

module.exports = expensesRouter;
