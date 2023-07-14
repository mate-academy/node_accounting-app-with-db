'use strict';

const express = require('express');
const { userController } = require('../controllers/users');

const router = express.Router();

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getOneUser);

router.post('/', userController.addUser);

router.delete('/:userId', userController.removeUser);

router.patch('/:userId', userController.updateUser);

module.exports = { router };
