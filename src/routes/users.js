'use strict';

const express = require('express');
const {
  getAll: getAllUsers,
  getOne: getOneUser,
  create: createUser,
  remove: removeUser,
  update: updateUser,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getOneUser);
router.post('/', createUser);
router.delete('/:userId', removeUser);
router.patch('/:userId', updateUser);

module.exports = { router };
