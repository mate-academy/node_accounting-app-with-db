const express = require('express');
const { isValidId, isValidBody } = require('../middleware/middleware');
const expenseControllers = require('../controllers/ExpenseControllers');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseControllers.getAllExps);

expenseRouter.get('/:id', isValidId, expenseControllers.getExById);

expenseRouter.post('/', express.json(), isValidBody, expenseControllers.addEx);

expenseRouter.patch(
  '/:id',
  isValidId,
  express.json(),
  isValidBody,
  expenseControllers.updateExp,
);

expenseRouter.delete('/:id', isValidId, expenseControllers.removeExp);

module.exports = expenseRouter;
