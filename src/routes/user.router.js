'use strict';

const usersController = require('../controllers/user.constroller');
const { Router } = require('express');

const userRouter = Router();

userRouter.get('/:id', usersController.getOne);
userRouter.get('/', usersController.getAll);
userRouter.post('/', usersController.addUser);
userRouter.delete('/:id', usersController.deleteUser);
userRouter.patch('/:id', usersController.editUser);

module.exports = { userRouter };
