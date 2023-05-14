'use strict';

const express = require('express');

const {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.delete('/:id', removeUser);
router.patch('/:id', updateUser);

module.exports = { router };
