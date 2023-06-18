'use strict';

const express = require('express');

const expensesRouter = express.Router();

const expensesControlers = require('../controllers/expenses');

expensesRouter.get('/', expensesControlers.getAll);

expensesRouter.get('/:expensesId', expensesControlers.getOne);

expensesRouter.post('/', express.json(), expensesControlers.create);

expensesRouter.delete('/:expensesId', expensesControlers.remove);

expensesRouter
  .patch('/:expensesId', express.json(), expensesControlers.update);

module.exports = expensesRouter;
