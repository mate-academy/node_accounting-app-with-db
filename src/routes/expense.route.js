const express = require('express');
const expensesController = require('../controllers/expenses.controller');
const validationMiddleware = require('../middleware/validationMiddleware');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);

expensesRouter.post(
  '/',
  validationMiddleware.validateExpenseInput,
  expensesController.createExpense,
);

expensesRouter.get(
  '/:id',
  validationMiddleware.validateId,
  expensesController.getById,
);

expensesRouter.delete(
  '/:id',
  validationMiddleware.validateId,
  expensesController.removeExpense,
);

expensesRouter.patch(
  '/:id',
  validationMiddleware.validateId,
  expensesController.updateExpense,
);

module.exports = {
  expensesRouter,
};
