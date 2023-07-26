'use strict';

const express = require('express');
const usersControllers = require('../controllers/users');
const router = express.Router();

router.get('/', usersControllers.getAll);

router.post('/', usersControllers.addUser);

router.get('/:userId', usersControllers.getOneUser);

router.delete('/:userId', usersControllers.deleteUser);

router.patch('/:userId', usersControllers.updateUser);

module.exports = { router };
