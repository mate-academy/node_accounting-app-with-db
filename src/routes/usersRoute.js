const express = require('express');

const usersController = require('../controllers/usersController.js');

const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.patch('/:id', usersController.updateUser);
router.delete('/:id', usersController.removeUser);

module.exports = { userRouter: router };
