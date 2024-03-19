'use strict';

const express = require('express');
const cors = require('cors');
const expenseController = require('../controllers/expense.controller');
const expenseRouter = express.Router();

expenseRouter.use(cors());
expenseRouter.use(express.json());

expenseRouter.get('/', expenseController.getAll);

expenseRouter.get('/:id', expenseController.get);

expenseRouter.post('/', expenseController.create);

expenseRouter.delete('/:id', expenseController.remove);

expenseRouter.patch('/:id', expenseController.update);

module.exports = {
  expenseRouter,
};
