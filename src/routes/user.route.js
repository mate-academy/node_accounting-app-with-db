'use strict';

const express = require('express');
const userController = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/', userController.get);

userRouter.get('/:id', userController.getOne);

userRouter.post('/', userController.post);

userRouter.patch('/:id', userController.update);

userRouter.delete('/:id', userController.remove);

module.exports = { userRouter };
