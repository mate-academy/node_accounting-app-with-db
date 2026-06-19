const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', userController.get);

userRouter.get('/:id', userController.getOne);

userRouter.post('/', userController.create);

userRouter.delete('/:id', userController.remove);

userRouter.patch('/:id', userController.update);

module.exports = { userRouter };
