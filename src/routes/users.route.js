const express = require('express');
const usersControllers = require('../controllers/users.controllers');

const router = express.Router();

router.get('/', usersControllers.getAllUsers);

router.get('/:id', usersControllers.getOneUser);

router.post('/', usersControllers.createUser);

router.delete('/:id', usersControllers.deleteUser);

router.patch('/:id', usersControllers.updateUser);

module.exports = {
  router,
};
