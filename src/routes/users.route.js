'use strict';

const express = require('express');
const {
  getAllUsers,
  createOneUser,
  getOneUser,
  deleteOneUser,
  updateOneUser,
} = require('../controllers/users.controller');

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getOneUser);
userRouter.post('/', createOneUser);
userRouter.delete('/:id', deleteOneUser);
userRouter.patch('/:id', updateOneUser);

module.exports = {
  userRouter,
};
