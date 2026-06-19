const express = require('express');

const usersController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.delete('/:id', usersController.removeUser);
router.patch('/:id', usersController.updateUser);

module.exports = { userRouter: router };
