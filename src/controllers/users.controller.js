const express = require('express');

const {
  getAllUsers,
  getUsersById,
  deleteUser,
  createUser,
  updateUser,
} = require('../routers/users.router.js');

const usersRoute = express.Router();

usersRoute.get('/', getAllUsers);

usersRoute.get('/:id', getUsersById);

usersRoute.post('/', createUser);

usersRoute.delete('/:id', deleteUser);

usersRoute.patch('/:id', updateUser);

module.exports = { usersRoute };
