const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);
router.get('/:id', usersController.getUser);
router.delete('/:id', usersController.deleteUser);
router.patch('/:id', usersController.updateUser);

module.exports = { usersRouter: router };
