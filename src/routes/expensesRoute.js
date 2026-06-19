const express = require('express');
const controllerExpenses = require('./../controllers/expensesController');

const routerExpenses = express.Router();

routerExpenses.get('/', controllerExpenses.get);

routerExpenses.get('/:id', controllerExpenses.getOne);

routerExpenses.post('/', controllerExpenses.create);

routerExpenses.delete('/:id', controllerExpenses.remove);

routerExpenses.patch('/:id', controllerExpenses.update);

module.exports = { routerExpenses };
