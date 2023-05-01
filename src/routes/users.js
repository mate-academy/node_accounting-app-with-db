'use strict';

const express = require('express');
const userController = require('../controllers/users.js');

const router = express.Router();

router.get('/', userController.getAll);

router.get('/:userId', userController.getOne);

router.post('/', userController.addUser);

router.delete('/:userId', userController.removeUser);

router.patch('/:userId', userController.updateUser);

module.exports = { router };
