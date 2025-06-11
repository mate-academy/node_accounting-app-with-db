const express = require('express');
const usersController = require('../controllers/users.controller.js');

const router = express.Router();

router.get('/', usersController.getAllUsers);

router.post('/', usersController.createUser);

router.get('/:id', usersController.getUser);

router.delete('/:id', usersController.removeUser);

router.patch('/:id', usersController.updateUser);

module.exports = router;
