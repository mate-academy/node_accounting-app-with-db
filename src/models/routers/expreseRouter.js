const express = require('express');

const { expensesController } = require('../controllers/express.controllers');

const createExpensesRouter = () => {
  const expreseRouter = express.Router();

  expreseRouter.get('/', expensesController.getAll);

  expreseRouter.get('/:id', expensesController.getById);

  expreseRouter.post('/', expensesController.create);

  expreseRouter.patch('/:id', expensesController.upDate);

  expreseRouter.delete('/:id', expensesController.deleteById);

  return expreseRouter;
};

module.exports = {
  createExpensesRouter,
};
