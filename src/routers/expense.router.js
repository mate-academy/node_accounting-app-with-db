const { Router } = require('express');
const { expensesController } = require('../controllers/controllers');

const expenseRouter = Router();

expenseRouter.get(`/`, expensesController.getAll);
expenseRouter.get(`/:id`, expensesController.getSingle);
expenseRouter.post(`/`, expensesController.create);
expenseRouter.delete(`/:id`, expensesController.deleteExpense);
expenseRouter.patch(`/:id`, expensesController.update);

module.exports = {
  expenseRouter,
};
