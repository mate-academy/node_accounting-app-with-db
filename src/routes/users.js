'use strict';

const express = require('express');
const userController = require('../controllers/users.js');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUser);
router.post('/', userController.addUser);
router.delete('/:userId', userController.deleteUser);
router.patch('/:userId', userController.updateUser);

module.exports = {
  router,
};
