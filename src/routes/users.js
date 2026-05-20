'use strict';

const { Router } = require('express');
const {
  listUsers,
  getUser,
  createUserHandler,
  handleUpdate,
  deleteUserHandler,
} = require('../controllers/users.controller');
const { asyncHandler } = require('../middleware/asyncHandler');

const usersRoute = Router();

usersRoute.get('/', asyncHandler(listUsers));
usersRoute.get('/:id', asyncHandler(getUser));
usersRoute.post('/', asyncHandler(createUserHandler));
usersRoute.patch('/:id', asyncHandler(handleUpdate));
usersRoute.put('/:id', asyncHandler(handleUpdate));
usersRoute.delete('/:id', asyncHandler(deleteUserHandler));

module.exports = { usersRoute };
