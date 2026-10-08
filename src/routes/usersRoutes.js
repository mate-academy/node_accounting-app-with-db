'use strict';

const {
  createUserController,
  getUsers,
  getUserById,
  patchUserById,
  deleteUserById,
} = require('../controllers/usersControllers');
const express = require('express');
const usersRoutes = express.Router();

usersRoutes.post('/', createUserController);
usersRoutes.get('/', getUsers);
usersRoutes.get('/:id', getUserById);
usersRoutes.patch('/:id', patchUserById);
usersRoutes.delete('/:id', deleteUserById);

module.exports = {
  usersRoutes,
};
