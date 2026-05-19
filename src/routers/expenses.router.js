const { Router } = require('express');
const {
  getAll,
  create,
  getById,
  deleteById,
  update,
} = require('../controllers/expenses.controller.js');

const expensesRouter = Router();

expensesRouter.get('/', getAll);
expensesRouter.post('/', create);
expensesRouter.get('/:id', getById);
expensesRouter.delete('/:id', deleteById);
expensesRouter.patch('/:id', update);

module.exports = {
  expensesRouter,
};
