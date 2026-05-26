const { Router } = require('express');

function createExpensesRouter(expensesController) {
  const expenseRouter = Router();

  expenseRouter.get('/', expensesController.getAll);
  expenseRouter.get('/:id', expensesController.getById);
  expenseRouter.post('/', expensesController.create);
  expenseRouter.delete('/:id', expensesController.remove);
  expenseRouter.put('/:id', expensesController.fullUpdate);
  expenseRouter.patch('/:id', expensesController.partUpdate);

  return expenseRouter;
}

module.exports = {
  createExpensesRouter,
};
