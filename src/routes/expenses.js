'use strict';

const express = require('express');

const expensesRouter = express.Router();

const expensesControlers = require('../controllers/expenses');

expensesRouter.get('/', expensesControlers.getAll);

expensesRouter.get('/:expensesId', expensesControlers.getOne);

expensesRouter.post('/', expensesControlers.create);

expensesRouter.delete('/:expensesId', expensesControlers.remove);

expensesRouter
  .patch('/:expensesId', expensesControlers.update);

module.exports = expensesRouter;
