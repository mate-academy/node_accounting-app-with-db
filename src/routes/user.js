'use strict';

const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');

userRouter.get('/', userController.getAll);

userRouter.get('/:categoryId', userController.getOne);

userRouter.post('/', userController.addOne);

userRouter.patch('/:categoryId', userController.update);

userRouter.delete('/:categoryId', userController.remove);

module.exports = { userRouter };
