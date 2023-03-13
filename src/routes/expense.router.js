'use strict';

const express = require('express');

const { expenseController } = require('../controllers/expense.controller.js');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getAll);
expenseRouter.get('/:expenseId', expenseController.getOne);
expenseRouter.post('/', express.json(), expenseController.create);
expenseRouter.delete('/:expenseId', expenseController.remove);
expenseRouter.patch('/:expenseId', express.json(), expenseController.update);

module.exports = { expenseRouter };
