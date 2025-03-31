const express = require('express');
const controllerUsers = require('./../controllers/usersController');

const routerUsers = express.Router();

routerUsers.get('/', controllerUsers.get);

routerUsers.get('/:id', controllerUsers.getOne);

routerUsers.post('/', controllerUsers.create);

routerUsers.delete('/:id', controllerUsers.remove);

routerUsers.patch('/:id', controllerUsers.update);

module.exports = { routerUsers };
