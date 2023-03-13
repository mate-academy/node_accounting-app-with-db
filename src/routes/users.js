'use strict';

const express = require('express');
const userController = require('../controllers/users');
const userRouter = express.Router();

userRouter.get('/', userController.getAll);

userRouter.get('/:userId', userController.getOne);

userRouter.post('/', userController.add);

userRouter.patch('/:userId', userController.update);

userRouter.delete('/:userId', userController.remove);

module.exports = userRouter;
