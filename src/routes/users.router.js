'use strict';

const express = require('express');
const userController = require('../controllers/users.controller');

const userRouter = express.Router();

userRouter.get('/', userController.getAll);

userRouter.get('/:id', userController.getById);

userRouter.post('/', userController.add);

userRouter.patch('/:id', userController.updateUser);

userRouter.delete('/:id', userController.deleteById);

module.exports = userRouter;
