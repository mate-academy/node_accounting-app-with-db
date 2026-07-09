const express = require('express');

const usersController = require('../controllers/Users.controller.js');

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.patch('/:id', usersController.updateUser);
router.delete('/:id', usersController.removeUser);

module.exports = router;
