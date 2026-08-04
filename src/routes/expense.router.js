const express = require('express');
const expenseController = require('../controllers/expense.controller');

const route = express.Router();

route.get('/', expenseController.getAll);
route.post('/', expenseController.create);

route.get('/:id', expenseController.getById);
route.delete('/:id', expenseController.remove);
route.patch('/:id', expenseController.update);

module.exports = route;
