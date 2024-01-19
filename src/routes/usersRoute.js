'use strict';

const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  removeUser,
  updateUser,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.delete('/:id', removeUser);
userRouter.patch('/:id', updateUser);

module.exports = { userRouter };
