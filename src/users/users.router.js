const express = require('express');
const userController = require('./users.controller.js');

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);

router.post('/', userController.createUser);

router.delete('/:id', userController.removeUser);

router.patch('/:id', userController.updateUser);

router.put('/:id', userController.updateUser);

module.exports = router;
