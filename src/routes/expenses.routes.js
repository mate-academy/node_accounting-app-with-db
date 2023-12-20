'use strict';

const express = require('express');
const expensesController = require('../controllers/users.controllers');
const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.get);
expensesRouter.post('/', expensesController.create);
expensesRouter.get('/:id', expensesController.getOne);
expensesRouter.delete('/:id', expensesController.remove);
expensesRouter.patch('/:id', expensesController.update);

module.exports = {
  expensesRouter,
};
