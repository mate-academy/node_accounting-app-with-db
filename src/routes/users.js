'use strict';

const express = require('express');
const { usersController } = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.getUsers);
router.post('/', usersController.addUser);
router.get('/:userId', usersController.getUserById);
router.delete('/:userId', usersController.deleteUser);
router.patch('/:userId', usersController.updateUser);

module.exports.usersRouter = router;
