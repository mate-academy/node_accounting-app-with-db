const express = require('express');
const usersController = require('./users.controler');

const userRouter = express.Router();

userRouter.get('/', usersController.getAll);

userRouter.get('/:id', usersController.getOne);

userRouter.post('/', usersController.postOne);

userRouter.delete('/:id', usersController.delete);

userRouter.patch('/:id', usersController.updateOne);

module.exports = userRouter;
