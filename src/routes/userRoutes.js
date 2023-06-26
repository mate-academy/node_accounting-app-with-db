'use strict';

const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.addUser);
router.delete('/:id', usersController.deleteUser);
router.patch('/:userId', usersController.updateUser);

module.exports = router;
