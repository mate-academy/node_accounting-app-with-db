'use strict';

const express = require('express');
const { userController } = require('../controllers/user.controller.js');

const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:userId', userController.getOne);
userRouter.post('/', express.json(), userController.add);
userRouter.delete('/:userId', userController.remove);
userRouter.patch('/:userId', express.json(), userController.update);

module.exports = { userRouter };
