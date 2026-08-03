const express = require('express');
const { Router } = express;
const usersController = require('./users.controller.js');

const users = Router();

users.get('/', usersController.getAll);
users.get('/:id', usersController.getOne);
users.post('/', usersController.create);
users.delete('/:id', usersController.deleteOne);
users.patch('/:id', usersController.update);

module.exports = users;
