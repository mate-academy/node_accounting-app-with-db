'use strict';

const express = require('express');
const userController = require('../controllers/users');

const userRouter = express.Router();

userRouter.patch('/:userId', userController.update);
userRouter.delete('/:userId', userController.remove);
userRouter.post('/', userController.add);
userRouter.get('/', userController.getAll);
userRouter.get('/:userId', userController.getOne);

module.exports = userRouter;
