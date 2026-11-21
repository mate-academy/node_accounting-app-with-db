'use strict';

function createUserRouter(UserController) {
  const router = require('express').Router();

  router.get('/', UserController.getAllUsers);

  router.post('/', UserController.createUser);

  router.get('/:id', UserController.getUserById);

  router.patch('/:id', UserController.updateUserById);

  router.delete('/:id', UserController.deleteUserById);

  return router;
}

module.exports = {
  createUserRouter,
};
