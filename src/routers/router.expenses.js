'use strict';

const express = require('express');
const { expensesController } = require('../controllers/controller.expenses');
const { middlewareCheckIdAsInteger } = require('../service/middlewareCheckIdAsInteger');

const routerExpenses = express.Router();

routerExpenses.get('/', expensesController.getAll);

routerExpenses.post(
  '/',
  expensesController.middlewareCheckCorrectPostData,
  expensesController.postById,
);

routerExpenses.get('/:id', expensesController.getById);

routerExpenses.patch(
  '/:id',
  expensesController.middlewareCheckCorrectPatchData,
  expensesController.patchById,
);

routerExpenses.delete('/:id', expensesController.deleteById);

routerExpenses.param('id', middlewareCheckIdAsInteger)

module.exports = {
  routerExpenses,
};
