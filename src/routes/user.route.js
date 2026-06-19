const express = require('express');
const UserController = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/', UserController.getAll);

userRouter.get('/:id', UserController.get);

userRouter.post('/', UserController.create);

userRouter.patch('/:id', UserController.edit);

userRouter.delete('/:id', UserController.remove);

module.exports = userRouter;
