'use strict';

const userController = require('../controllers/usersController');
const express = require('express');

const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:userId', userController.getById);
userRouter.post('/', express.json(), userController.create);
userRouter.delete('/:userId', userController.remove);
userRouter.patch('/:userId', express.json(), userController.update);

module.exports = { userRouter };
