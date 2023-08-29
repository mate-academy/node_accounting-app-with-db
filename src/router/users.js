'use strict';

const express = require('express');
const {
  getAllUsers,
  createUser,
  getOneUser,
  removeUser,
  updateUser,
} = require('../controllers/users.js');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', express.json(), createUser);
router.get('/:id', getOneUser);
router.delete('/:id', removeUser);
router.patch('/:id', express.json(), updateUser);

module.exports = router;
