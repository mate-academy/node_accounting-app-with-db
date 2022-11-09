'use strict';

const express = require('express');
const usersController = require('./users-controller');

const router = express.Router();

// ======= USERS API:
// GET ALL:
router.get('/', usersController.getAllUsers);

// GET ONE:
router.get('/:userID', usersController.getOneUsers);

// POST ONE:
router.post('/', usersController.createOneUser);

// PATCH ONE:
router.patch('/:userID', usersController.updateUser);

// DELETE ONE:
router.delete('/:userID', usersController.deleteUser);

module.exports = router;
