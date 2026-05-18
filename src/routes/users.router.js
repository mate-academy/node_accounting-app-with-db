const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  addUser,
  deleteUser,
} = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.get('/:id', getUserById);

usersRouter.put('/:id', updateUser);

usersRouter.patch('/:id', updateUser);

usersRouter.post('/', addUser);

usersRouter.delete('/:id', deleteUser);

module.exports = {
  usersRouter,
};
