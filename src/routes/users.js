'use strict';

const express = require('express');
const {
  operateAddUser,
  operateGetAllUsers,
  operateGetUserById,
  operateDeleteUserById,
  operateUpdateUserById,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.post('/', operateAddUser);

userRouter.get('/', operateGetAllUsers);

userRouter.get('/:id', operateGetUserById);

userRouter.patch('/:id', operateUpdateUserById);

userRouter.delete('/:id', operateDeleteUserById);

module.exports = {
  userRouter,
};
