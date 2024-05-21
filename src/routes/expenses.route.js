const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const route = express.Router();

route.get('/', expensesController.getAll);

route.get('/:id', expensesController.getOne);

route.post('/', expensesController.create);

route.delete('/:id', expensesController.remove);

route.patch('/:id', expensesController.update);

module.exports = {
  route,
};
