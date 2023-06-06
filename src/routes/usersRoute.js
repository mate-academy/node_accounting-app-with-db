'use strict';

const express = require('express');
const userController = require('../controllers/usersController');

const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:userId', userController.getOne);

userRouter.post('/', userController.create);
userRouter.delete('/:userId', userController.remove);
userRouter.patch('/:userId', userController.update);

module.exports = { userRouter };
