const express = require('express');
const usersControllers = require('../controllers/usersControllers');

const usersRoutes = express.Router();

usersRoutes.get('/', usersControllers.get);

usersRoutes.get('/:id', usersControllers.getOne);

usersRoutes.delete('/:id', usersControllers.remove);

usersRoutes.patch('/:id', usersControllers.patch);

usersRoutes.post('/', usersControllers.post);

module.exports = { usersRoutes };
