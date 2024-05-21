const express = require('express');
const usersController = require('../controllers/users.controller');

const route = express.Router();

route.get('/', usersController.getAll);

route.get('/:id', usersController.getOne);

route.post('/', usersController.create);

route.delete('/:id', usersController.remove);

route.patch('/:id', usersController.update);

module.exports = {
  route,
};
