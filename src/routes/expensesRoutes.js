const express = require('express');
const expensesControllers = require('../controllers/expensesControllers');

const expensesRoutes = express.Router();

expensesRoutes.get('/', expensesControllers.get);

expensesRoutes.get('/:id', expensesControllers.getOne);

expensesRoutes.delete('/:id', expensesControllers.remove);

expensesRoutes.patch('/:id', expensesControllers.patch);

expensesRoutes.post('/', expensesControllers.post);

module.exports = { expensesRoutes };
