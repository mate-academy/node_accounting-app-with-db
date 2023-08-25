'use strict';

const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', express.json(), createUser);
router.patch('/:userId', express.json(), updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;
