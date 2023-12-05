'use strict';

const express = require('express');
const userController = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/', userController.get);

userRouter.post('/', express.json(), userController.create);

userRouter.get('/:id', userController.getOne);

userRouter.patch('/:id', express.json(), userController.update);

userRouter.delete('/:id', userController.remove);

module.exports = userRouter;
