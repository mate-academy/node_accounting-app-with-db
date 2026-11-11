const { Router } = require('express');
const usersController = require('../controllers/users.controller');

const userRouter = Router();

userRouter.get('/', usersController.getAllUsers);
userRouter.post('/', usersController.createUser);
userRouter.get('/:id', usersController.getOneUser);
userRouter.delete('/:id', usersController.deleteOneUser);
userRouter.patch('/:id', usersController.updateUser);

module.exports = userRouter;
