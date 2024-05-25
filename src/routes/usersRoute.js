const express = require('express');
const {
  httpGetAllUsers,
  httpPostUser,
  httpGetUserById,
  httpDeleteUser,
  httpUpdateUser,
} = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', httpGetAllUsers);
usersRouter.get('/:id', httpGetUserById);
usersRouter.post('/', express.json(), httpPostUser);
usersRouter.delete('/:id', httpDeleteUser);
usersRouter.patch('/:id', express.json(), httpUpdateUser);

module.exports = { usersRouter };
