const express = require('express');
const {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  deleteUserController,
  updateUserController,
} = require('../controllers/users.controller');
const { Router } = express;

const usersRouter = Router();

usersRouter.get('/', getAllUsersController);

usersRouter.get('/:userId', getUserByIdController);

usersRouter.post('/', createUserController);

usersRouter.delete('/:userId', deleteUserController);

usersRouter.patch('/:userId', updateUserController);

module.exports = {
  usersRouter,
};
