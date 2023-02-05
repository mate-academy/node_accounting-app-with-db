'use strict';

const express = require('express');
const usersController = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/', usersController.getAll);
userRouter.post('/', express.json(), usersController.addUser);
userRouter.get('/:userId', usersController.getById);
userRouter.delete('/:userId', usersController.removeUser);
userRouter.patch('/:userId', express.json(), usersController.updateUser);

module.exports = userRouter;
