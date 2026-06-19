const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/users.controller.js');

userRouter.use(express.json());

userRouter.get('/', userController.getAll);
userRouter.post('/', userController.create);
userRouter.get('/:id', userController.getById);
userRouter.delete('/:id', userController.remove);
userRouter.patch('/:id', userController.update);

module.exports = userRouter;
