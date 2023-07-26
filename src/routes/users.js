'use strict';

const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/:userId', usersController.getUserById);
router.get('/', usersController.getAllUsers);
router.post('/', usersController.addUser);
router.patch('/:userId', usersController.updateUser);
router.delete('/:userId', usersController.deleteUser);

module.exports.usersRouter = router;
