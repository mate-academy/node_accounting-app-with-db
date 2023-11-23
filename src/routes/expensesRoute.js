'use strict';

const express = require('express');
const expensesConroller = require('./../controllers/expensesController');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesConroller.get);

expensesRouter.get('/:id', expensesConroller.getOne);

expensesRouter.delete('/:id', expensesConroller.remove);

expensesRouter.post('/', expensesConroller.create);

expensesRouter.patch('/:id', expensesConroller.update);

module.exports = { expensesRouter };
