const express = require('express');

function createUserRouter(usersService) {
  const router = express.Router();
  const { createUsersController } = require('../controllers/user.controllers');
  const usersController = createUsersController(usersService);

  router.get('/', usersController.getAll);
  router.get('/:id', usersController.getById);
  router.post('/', express.json(), usersController.create);
  router.patch('/:id', express.json(), usersController.update);
  router.delete('/:id', usersController.remove);

  return router;
}

module.exports = { createUserRouter };
