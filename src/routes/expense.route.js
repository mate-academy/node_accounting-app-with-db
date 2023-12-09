'use strict';

const express = require('express');

const expenseController = require('../controllers/expense.controller');

const expenseRouter = express.Router();

expenseRouter.get('/', (req, res) => {
  const { userId, categories, from, to } = req.query;

  switch (true) {
    case from !== undefined && to !== undefined:
      return expenseController.filterByPeriod(req, res);

    case userId !== undefined && categories !== undefined:
      return expenseController.filterByCategory(req, res);

    case userId !== undefined:
      return expenseController.filterByUserId(req, res);

    default:
      return expenseController.getAll(req, res);
  }
});

expenseRouter.get('/:id', expenseController.getOne);

expenseRouter.post('/', expenseController.create);

expenseRouter.patch('/:id', expenseController.update);

expenseRouter.delete('/:id', expenseController.remove);

module.exports = expenseRouter;
