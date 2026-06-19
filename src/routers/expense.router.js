const { Router } = require('express');
const { expenseController } = require('../controllers/controllers');

const expenseRouter = Router();

expenseRouter.get(`/`, expenseController.getAll);
expenseRouter.get(`/:id`, expenseController.getSingle);
expenseRouter.post(`/`, expenseController.create);
expenseRouter.delete(`/:id`, expenseController.remove);
expenseRouter.patch(`/:id`, expenseController.update);

module.exports = {
  expenseRouter,
};
