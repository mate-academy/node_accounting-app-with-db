const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/users-Controllers.js');

userRouter.get('/', express.json(), userController.getAllUsers);
userRouter.post('/', express.json(), userController.createUser);
userRouter.get('/:id', userController.getUsersById);
userRouter.patch('/:id', express.json(), userController.uptadeUsers);
userRouter.delete('/:id', userController.deleteUsers);

module.exports = userRouter;
