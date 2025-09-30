const express = require('express');

function createExpenseRouter(usersService, expensesService) {
  const router = express.Router();

  const {
    createExpensesController,
  } = require('../controllers/expenses.controllers');

  const expensesController = createExpensesController(
    expensesService,
    usersService,
  );

  router.get('/', expensesController.getAll);
  router.get('/:id', expensesController.getById);
  router.post('/', express.json(), expensesController.create);
  router.patch('/:id', express.json(), expensesController.update);
  router.delete('/:id', expensesController.remove);

  return router;
}

module.exports = { createExpenseRouter };
