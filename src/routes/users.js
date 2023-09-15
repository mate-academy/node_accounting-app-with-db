'use strict';

const userRouter = require('express').Router();
const { usersControllers } = require('../controllers/users');

userRouter.get('/:userId', usersControllers.getOne);
userRouter.get('/', usersControllers.getAll);
userRouter.post('/', usersControllers.create);
userRouter.delete('/:userId', usersControllers.remove);
userRouter.patch('/:userId', usersControllers.update);

module.exports = {
  userRouter,
};
