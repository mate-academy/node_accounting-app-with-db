'use strict';

const express = require('express');
const expensesConroller = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesConroller.get);
expensesRouter.get('/:id', expensesConroller.getOne);
expensesRouter.post('/', expensesConroller.create);
expensesRouter.delete('/:id', expensesConroller.remove);
expensesRouter.patch('/:id', expensesConroller.update);

module.exports = { expensesRouter };
