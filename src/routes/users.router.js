const express = require('express');
const {
  getAllUsers,
  createUser,
  findUserById,
  deleteUser,
  updateUser,
} = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.post('/', createUser);

usersRouter.get('/:id', findUserById);

usersRouter.delete('/:id', deleteUser);

usersRouter.patch('/:id', updateUser);

module.exports = { usersRouter };
