'use strict';

const {
  getAll,
  setUser,
  getUserById,
  deleteUserById,
  patchUserById,
} = require('../controllers/users');

const express = require('express');
const routerUsers = express.Router();

routerUsers.get('/', getAll);
routerUsers.post('/', express.json(), setUser);
routerUsers.get('/:userId', express.json(), getUserById);
routerUsers.delete('/:userId', express.json(), deleteUserById);
routerUsers.patch('/:userId', express.json(), patchUserById);
module.exports = { routerUsers };
