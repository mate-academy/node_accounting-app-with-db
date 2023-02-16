'use strict';

const express = require('express');
const usersControllers = require('./controllers');

const router = express.Router();

router.get('/', usersControllers.getUsers);

router.get('/:id', usersControllers.getUser);

router.post('/', usersControllers.addUser);

router.delete('/:id', usersControllers.deleteUser);

router.patch('/:id', usersControllers.updateUser);

module.exports.usersRouter = router;
