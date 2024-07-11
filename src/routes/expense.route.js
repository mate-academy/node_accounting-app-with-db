const express = require('express');
const {
  get,
  getById,
  create,
  remove,
  update,
} = require('../controllers/expense.controller');

const expenseRouter = express.Router();

expenseRouter.get('/', get);
expenseRouter.get('/:id', getById);
expenseRouter.post('/', create);
expenseRouter.delete('/:id', remove);
expenseRouter.patch('/:id', update);

module.exports = expenseRouter;
