'use strict';

const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.get('/', userController.getAllUser);

router.get('/:userId', userController.getUserById);

router.post('/', userController.createUser);

router.patch('/:userId', userController.updateUserById);

router.delete('/:userId', userController.deleteUser);

module.exports = {
  router,
};
