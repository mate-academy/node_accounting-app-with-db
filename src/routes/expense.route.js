'use strict';

const express = require('express');
const exponseController = require('../controllers/expense.controller');

const expenseRouter = express.Router();

expenseRouter.get('/', exponseController.get);

expenseRouter.get('/:id', exponseController.getOne);

expenseRouter.post('/', exponseController.post);

expenseRouter.patch('/:id', exponseController.update);

expenseRouter.delete('/:id', exponseController.remove);

module.exports = { expenseRouter };
