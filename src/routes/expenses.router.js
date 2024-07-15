const express = require('express');
const { ExpensesService } = require('./../services');
const { ExpensesController } = require('./../controllers');

const expensesRouter = express.Router();
const controller = new ExpensesController(ExpensesService);

expensesRouter.get('/', controller.getAll.bind(controller));
expensesRouter.post('/', controller.create.bind(controller));
expensesRouter.get('/:id', controller.getOne.bind(controller));
expensesRouter.patch('/:id', controller.update.bind(controller));
expensesRouter.delete('/:id', controller.deleteOne.bind(controller));

module.exports = expensesRouter;
