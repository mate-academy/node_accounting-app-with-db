const express = require('express');
const userController = require('../controllers/user.controller.js');

const userRouter = express.Router();

userRouter.get('/', userController.get);
userRouter.post('/', userController.create);
userRouter.get('/:id', userController.getOne);
userRouter.patch('/:id', userController.update);
userRouter.delete('/:id', userController.remove);

module.exports = userRouter;
