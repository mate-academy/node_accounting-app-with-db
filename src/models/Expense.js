'use strict';

const express = require('express');

const controllers = require('../controllers/expenses');

const expenseRouter = express.Router();

expenseRouter.get('/', controllers.getAll);

expenseRouter.get('/:expenseId', controllers.getOne);

expenseRouter.post('/', controllers.add);

expenseRouter.delete('/:expenseId', controllers.remove);

expenseRouter.patch('/:expenseId', controllers.update);

module.exports = { expenseRouter };
