'use strict';

const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.getAllUsers);

router.get('/:userId', usersController.getUserById);

router.post('/', express.json(), usersController.addUser);

router.delete('/:userId', usersController.deleteUser);

router.patch('/:userId', express.json(), usersController.updateUser);

module.exports = router;
