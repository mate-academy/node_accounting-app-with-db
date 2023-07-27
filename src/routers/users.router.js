'use strict';

const express = require('express');
const {
  getAllUsersController,
  createUsersController,
  getOneUsersController,
  removeUsersController,
  updateUsersController,
} = require('../controllers/users.controllers');

const userRouter = express();

userRouter.get('/', getAllUsersController);

userRouter.get('/:userId', getOneUsersController);

userRouter.post('/', express.json(), createUsersController);

userRouter.delete('/:userId', removeUsersController);

userRouter.patch('/:userId', express.json(), updateUsersController);

module.exports = { userRouter };
