'use strict';

const express = require('express');
const userController = require('../controllers/users');
const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:userId', userController.getOne);
userRouter.post('/', userController.add);
userRouter.delete('/:userId', userController.remove);
userRouter.patch('/:userId', userController.update);

module.exports = { userRouter };
