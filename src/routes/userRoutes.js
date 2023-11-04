'use strict';

const express = require('express');
const {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  modifyUser,
} = require('../controllers/userController.js');

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/', createUser);
userRouter.get('/:id', getUserById);
userRouter.delete('/:id', deleteUser);
userRouter.patch('/:id', modifyUser);

module.exports = { userRouter };
