const express = require('express');
const expensesRoute = express.Router();
const controller = require('../controllers/expenses.controller');

expensesRoute.get('/', controller.get);
expensesRoute.get('/:id', controller.getOne);
expensesRoute.post('/', controller.post);
expensesRoute.patch('/:id', controller.patch);
expensesRoute.delete('/:id', controller.deleting);

module.exports = {
  expensesRoute,
};
