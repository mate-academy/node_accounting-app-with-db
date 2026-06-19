const express = require('express');
const { userController } = require('../controller/users.controller');

const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getOne);
userRouter.post('/', userController.create);
userRouter.delete('/:id', userController.remove);
userRouter.patch('/:id', userController.update);

module.exports = { userRouter };
