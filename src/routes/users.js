'use strict';

const express = require('express');
const {
  getAllUsersAction,
  addUserAction,
  getUserAction,
  deleteUserAction,
  updateUserAction,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getAllUsersAction);

router.post('/', addUserAction);

router.get('/:id', getUserAction);

router.delete('/:id', deleteUserAction);

router.patch('/:id', updateUserAction);

module.exports = router;
