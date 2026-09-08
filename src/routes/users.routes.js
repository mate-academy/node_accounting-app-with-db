'use strict';

const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.post('/', usersController.createUser);
router.get('/:id', usersController.getById);
router.patch('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
