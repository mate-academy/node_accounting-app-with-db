'use strict';

const express = require('express');
const usersController = require('../controllers/users.js');

const router = express.Router();

router.get('/', usersController.getAll);

router.get('/:userId', usersController.getUser);

router.post('/', usersController.createUser);

router.patch('/:userId', usersController.updateUser);

router.delete('/:userId', usersController.removeUser);

module.exports = router;
