'use strict';

const express = require('express');

const expenseController = require('../controllers/expense.controller');

const userRouter = express.Router();

userRouter.get('/', expenseController.get);

userRouter.get('/:id', expenseController.getOne);

userRouter.post('/', expenseController.create);

userRouter.patch('/:id', expenseController.update);

userRouter.delete('/:id', expenseController.remove);

module.exports = userRouter;
