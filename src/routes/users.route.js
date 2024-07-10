const express = require('express');
const controller = require('../controllers/users.controller');

const usersRoute = express.Router();

usersRoute.get('/', controller.get);
usersRoute.get('/:id', controller.getOne);
usersRoute.post('/', controller.post);
usersRoute.patch('/:id', controller.patch);
usersRoute.delete('/:id', controller.deleting);

module.exports = {
  usersRoute,
};
