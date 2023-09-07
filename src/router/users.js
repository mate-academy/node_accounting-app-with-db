'use strict';

const express = require('express');
const {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/users.js');

const router = express.Router();

router.get('/', getUsers);
router.post('/', express.json(), createUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.patch('/:id', express.json(), updateUser);

module.exports = router;
