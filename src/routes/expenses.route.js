'use strict';

const EXPENSES_ROUTES = {
  BASE: '/',
  ID: '/:id',
};

const expensesController = require('./../controllers/expenses.controller.js');

const express = require('express');
const expensesRouter = express.Router();

expensesRouter.get(EXPENSES_ROUTES.BASE, expensesController.get);
expensesRouter.get(EXPENSES_ROUTES.ID, expensesController.getOne);
expensesRouter.post(EXPENSES_ROUTES.BASE, expensesController.post);
expensesRouter.delete(EXPENSES_ROUTES.ID, expensesController.remove);
expensesRouter.patch(EXPENSES_ROUTES.ID, expensesController.patch);

module.exports = expensesRouter;
