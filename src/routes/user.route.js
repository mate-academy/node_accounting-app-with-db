'use strict';

const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/', userController.getUsers);

router.get('/:id', userController.getUserById);

router.post('/', userController.createUser);

router.delete('/:id', userController.deleteUser);

router.patch('/:id', userController.changeUser);

module.exports = {
  router,
};
