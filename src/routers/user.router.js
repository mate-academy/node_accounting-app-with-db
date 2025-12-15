'use strict';

const express = require('express');
const {
  createUser,
  getUsers,
  getUserById,
} = require('../controllers/user.controller');

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);

module.exports = {
  userRouter: router,
};
