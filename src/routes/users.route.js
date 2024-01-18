'use strict';

const express = require('express');
const {
  getUsers,
  getOneUser,
  deleteUser,
  createNewUser,
  updateOneUser,
} = require('../controllers/users.controller');

const userRouter = express.Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getOneUser);

userRouter.delete('/:id', deleteUser);

userRouter.post('/', createNewUser);

userRouter.patch('/:id', updateOneUser);

module.exports = {
  userRouter,
};
